<template v-bind:style="{ backgroundColor: color}">
    <v-container fluid>
      <article>
          <h1>Estarémos de vuelta muy pronto!</h1>
          <div>
              <p>Disculpe las molestias, estamos trabajando en el sitio en este momento. Si es necesario, puede contactarnos al correo <a href="mailto:#">sinide.tdf@gmail.com</a>, de igual manera, estaremos de nuevo online muy pronto!</p>
              <p>&mdash; Equipo de SIEP</p>
          </div>
      </article>
    </v-container>
</template>
<script>

  import router from '../router'

  export default {
    created: function(){
      store.commit('updateTitle',"SIEP | MANTENIMIENTO");
      this.logout();
    },
    data(){
      return{
        isMobile:false,
        items: [],
        color: '#5C6BC0',
        apigw: process.env.SIEP_API_GW_INGRESS,
      }
    },
    components :{ },
    name: "login",
    computed:{
      user(){
        return store.state.user
      },
      dialog(){
        console.log("Dialog",store.state.dialog.dialog);
        return store.state.dialog.dialog;
      }
    },
    mounted(){
      this.onResize();
    },
    watch:{
      dialog(){}
    },
    methods:{
      onResize(){
        if(window.innerWidth <= 480){
          this.isMobile = true;
        }else{
          this.isMobile = false;
        }
      },
      carouselImages(r) {
        // console.log(this.items)
      var imgs = {}
      r.keys().forEach(key => (imgs[key] = require("@/assets/carousel"+key.substr(1)),
      this.items.push({src : imgs[key]})
      ))
    },
      goTo : function(social){
        window.location = this.apigw+'/auth/social/'+social+'?app=siep-pwa';
      },
      logout : function(){
        if(this.user.loggedIn){
          store.dispatch('logout');
        }
      }
    }
  }
</script>

<style>
  article { font-size: 20px; text-align: center; padding: 50px; }
  /*h1 { font-size: 50px; }*/
  body { font: Helvetica, sans-serif; color: #333; }
  /*article { display: block; text-align: left; width: 650px; margin: 0 auto; }*/
  a { color: #dc8100; text-decoration: none; }
  a:hover { color: #333; text-decoration: none; }
</style>