<template>

  <v-jumbotron>
    <v-container fill-height>
      <v-layout align-center>
        

        <v-flex xs12 class="text-xs-center">
          <v-progress-circular
                  :size="70"
                  :width="7"
                  color="orange"
                  indeterminate
                  v-if="user.apiGetUserDataRunning"
          ></v-progress-circular>

          <div v-if="!user.loggedIn && !user.apiGetUserDataRunning">
            <p class="subheading">Por favor, inicie sesion para acceder a esta sección.</p>

            <div class="text-xs-center">
              <v-btn round color="primary" small @click="goToLogin">Quiero iniciar sesion</v-btn>
            </div>

          </div>

          <div v-if="user.loggedIn">
            <h3 class="display-2 font-weight-bold" >Bienvenido</h3>

            <h3 v-if="persona" class="display-1">
              {{persona.nombres }} {{persona.apellidos }}
            </h3>

            <v-divider class="my-3"></v-divider>

            <div v-if="!persona" >
              <p class="subheading">Por favor, complete sus datos personales para poder continuar.</p>

              <v-divider class="my-3"></v-divider>

              <v-flex>
                <v-btn class="mx-0" color="success" large :block="isMobile" @click="goToFamiliar('create')">
                  <v-icon left>how_to_reg</v-icon>Completar perfil
                </v-btn>
              </v-flex>
            </div>
            <!-- EN CASO QUE LA PERSONA ESTE DEFINIDA -->
            <div v-else>

              <!-- EDICION DE PERSONA -->
              
              <v-flex>
                <v-btn class="mx-0" color="orange" dark large :block="isMobile" @click="goToFamiliar('update')">
                  <v-icon left>edit</v-icon>Editar  mi perfil
                </v-btn>
              </v-flex>

              <v-flex>
                <v-btn class="mx-0" color="primary" large :block="isMobile" @click="goToStudent">
                  <v-icon left>how_to_reg</v-icon>Agregar/Ver Estudiantes
                </v-btn>
              </v-flex>
            </div>

          </div>

        </v-flex>

      </v-layout>
    </v-container>
  </v-jumbotron>

</template>
<script>
  import router from '../router'

  export default {
    data: ()=>({
      isMobile:false,
      personaUpdated:false,
      
    }),
    created: function() {
      store.commit('updateTitle',"SIEP | Familiares");
    },
    mounted: function() {
      this.onResize();
    },
    computed: {
      user(){
        return store.state.user
      },
      persona(){
        return store.getters.persona;
      }
    },
    watch:{
      persona(value){
        if(!this.personaUpdated){
          this.createFamiliar(value);
        }else{
        }
      }
    },
    methods:{
      onResize(){
        if(window.innerWidth <= 480){
          this.isMobile = true;
        }else{
          this.isMobile = false;
        }
      },
      goToLogin: function(){
        router.push('/')
      },
      goToFamiliar:function(mode){
        router.push(`/inscripciones/familiar/${mode}`)
      },
      goToStudent:function(){
        router.push('/inscripciones')
      },
      createFamiliar: function(persona){
        this.personaUpdated = true;
        var pers = persona;
        pers = _.omitBy(pers, _.isEmpty);
        pers.vinculo
        pers._method = "POST";
        pers.familiar = 1;
        pers.ciudad = pers.ciudad.nombre;
        pers.alumno = 0;
        if(pers.sexo === "Masculino"){
          pers.vinculo = "Padre";
        }else{
          pers.vinculo = "Madre";
        }
        store.dispatch('apiCreatePersona',pers);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
