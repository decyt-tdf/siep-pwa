<template v-bind:style="{ backgroundColor: color}">
    <v-container fluid>
        <v-slide-y-transition mode="out-in">
            <v-layout column align-center>

                <v-carousel v-bind:class="{ 'carousel' : !isMobile, 'carousel-mobile' : isMobile}" light active-class hide-delimiters>
                  <v-carousel-item
                    v-for="(item,i) in items"
                    :key="i"
                    :src="item.src"
                  ></v-carousel-item>
                </v-carousel>

                <v-divider></v-divider>

                <div class="text-xs-center">
                    <v-btn round color="indigo darken-3" dark @click="goTo('facebook')">Ingresar con facebook</v-btn>
                    <v-btn round color="red darken-1" dark @click="goTo('google')">Ingresar con Google</v-btn>
                </div>

            </v-layout>
        </v-slide-y-transition>
    </v-container>
</template>
<script>

  import FacebookIcon from "vue-material-design-icons/facebook.vue"
  import GoogleIcon from "vue-material-design-icons/google.vue"

  import router from '../router'

  export default {
    created: function(){
      store.commit('updateTitle',"SIEP | LogIn");
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
    created: function(){
      store.commit('updateTitle',"SIEP | Familiares");
      this.carouselImages(require.context("@/assets/carousel", true, /\.jpg$/))
    },
    components :{ FacebookIcon,GoogleIcon  },
    name: "login",
    computed:{
      user(){
        return store.state.user
      }
    },
    mounted(){
      this.onResize();
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
    body {
        background-color: #5C6BC0;
    }

    FacebookIcon {
        font-size: 50px;
    }

    .carousel {
      height: 250px !important;
    }

    .carousel-mobile {
      height: 200px !important;
    }

</style>