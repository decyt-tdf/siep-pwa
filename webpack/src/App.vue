<template>
  <v-app>

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

  </v-app>
</template>

<script>
  import UserSidebar from './components/user_sidebar.vue'
  import MenuSidebar from './components/menu_sidebar.vue'
  import TransitionPage from './components/TransitionPage.vue'


  export default {
    components: { UserSidebar, MenuSidebar, TransitionPage},
    data () {
      return {
        drawer: false,
        toolbar_disabled:true
      }
    },
    computed: {
      menu_toolbar() {
        return store.state.menu_toolbar;
      }
    },
    created(){
      console.log('APP Created');
      store.dispatch('extractToken');
    },
    name: 'App'
  }
</script>
<style>
  
</style>

