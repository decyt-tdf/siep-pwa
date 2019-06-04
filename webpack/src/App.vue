<template>
  <v-app>
    <v-container v-if="!maintenanceMode">
    <!-- Sidebar !-->
    <v-navigation-drawer
      persistent
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      
      <!-- Componente UserSidebar -->
      <user-sidebar />
      <v-divider></v-divider>
      <!-- Componente MenuSidebar -->
      <menu-sidebar />

    </v-navigation-drawer>

    <!-- Menu toolbar !-->
    <v-toolbar app color="orange darken-1" dark >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="menu_toolbar.title" ></v-toolbar-title>
    </v-toolbar>

    <!-- Contenido de navegacion !-->
    <v-content>

      <!-- Alert Message -->
      <v-alert
        :value="alert.show"
        :type="alert.class" 
        transition="scale-transition"
      >
        {{ alert.message }}
      </v-alert>
      <!-- /Alert Message -->
      <transition-page>
        <router-view/>
      </transition-page>
    </v-content>

    <!-- Footer -->
    <v-footer
      height="auto"
      color="primary lighten-1"
    >
      <v-flex
        text-xs-center
        white--text
        xs12
      >
        &copy; 2019 — <strong>Subsecretaría de Planeamiento Educativo, Informática y Evaluación</strong>
      </v-flex>
    </v-footer>
    </v-container>
    <v-container v-if="maintenanceMode">
      <article>
          <h1>Estarémos de vuelta muy pronto!</h1>
          <div>
              <p>Disculpe las molestias, estamos trabajando en el sitio en este momento. Si es necesario, puede contactarnos al correo <a href="mailto:#">sinide.tdf@gmail.com</a>, de igual manera, estaremos de nuevo online muy pronto!</p><br>
              <p style="text-align:left !important;">&mdash; Equipo de SIEP</p>
          </div>
      </article>
    </v-container>
  </v-app>
</template>

<script>
  import UserSidebar from './components/user_sidebar.vue'
  import MenuSidebar from './components/menu_sidebar.vue'
  import TransitionPage from './components/TransitionPage.vue'

  export default {
    components: { UserSidebar, MenuSidebar, TransitionPage },
    data () {
      return {
        drawer: false,
        toolbar_disabled: true,
        maintenanceMode: false
      }
    },
    computed: {
      menu_toolbar() {
        return store.state.menu_toolbar;
      },
      alert() {
        console.log(store.state.alert.alert);
        return store.state.alert.alert;
      }
      
    },
    watch:{
      alert(newValue,oldValue) {
        setTimeout(() => newValue.show = false, 5000);
      },
    },
    created(){
      console.log('APP Created');
      store.dispatch('extractToken');
      this.verifyHost();
    },
    methods:{
      verifyHost(){
        if(window.location.hostname.includes('familiares')){
          this.maintenanceMode = true;
        }else{
          console.log(window.location.hostname);
          this.maintenanceMode = false;
        }
      }
    },
    name: 'App'
  }
</script>
<style>
  article { font-size: 20px; text-align: center; padding: 10px; }
  /*h1 { font-size: 50px; }*/
  body { font: Helvetica, sans-serif; color: #333; }
  /*article { display: block; text-align: left; width: 650px; margin: 0 auto; }*/
  a { color: #dc8100; text-decoration: none; }
  a:hover { color: #333; text-decoration: none; }
</style>

