<template>
  <v-container>
      <v-flex xs12 class="text-xs-center">
          <v-breadcrumbs>
              <v-icon slot="divider">forward</v-icon>

              <v-breadcrumbs-item
                      v-for="item in breadcrumbs"
                      :disabled="item.disabled"
                      :key="item.text"
              >
                  {{ item.text }}
              </v-breadcrumbs-item>
          </v-breadcrumbs>

      <v-divider />

      <v-text-field
              v-model="documento_nro"
              label="Ingresar documento del alumno"
              v-on:keyup.enter="startFindPersona"
      ></v-text-field>
      <v-btn color="primary" @click="startFindPersona" :loading="findPersonaRunning"><v-icon left>search</v-icon>Buscar</v-btn>

      <!-- Resultados de busqueda -->
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex
                v-for="res in resultado"
                :key="res.id"
                xs12 sm12 md3 lg3 xl6 mb-1
              >
            <v-card>
              <v-layout fill-height>
                <v-flex xs12 flexbox>
                  <v-card-title primary-title>
                    <div>
                      <h3 class="subheading mb-0">{{ res.nombres }} {{ res.apellidos}}</h3>
                      <div>DNI: {{ res.documento_nro}}</div>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn color="success" @click="goWithSelected(res)"><v-icon left>person</v-icon>Seleccionar alumno</v-btn>
                  </v-card-actions>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>


      <v-divider v-if="alumnos.length" />
      <!-- Resultados de Relaciones con Familiar -->
      <v-container fluid grid-list-md v-if="alumnos.length">
        <p >
          AQUI DEBAJO SE LISTAN LOS ALUMNOS QUE ESTAN REGISTRADOS COMO FAMILIAR SUYO
        </p>
        <v-layout row wrap>
        <!-- <v-data-iterator
            :items="alumnos"
            content-tag="v-layout"
            hide-actions
            no-data-text=""
            column 
        > -->
          <v-flex
            v-for="al in alumnos"
            :key="al.id"
            xs12 sm12 md3 lg3 xl6 mb-1
          >

          <v-card>
            <v-layout fill-height>
              <v-flex xs12 flexbox>
              <v-card-text>
                <div>
                  <h3 class="subheading mb-0">{{ al.alumno.persona.nombres }} {{ al.alumno.persona.apellidos}}</h3>
                  <div>DNI: {{ al.alumno.persona.documento_nro}}</div>
                  <v-chip v-if="al.status === 'confirmada'" color="green" text-color="white">
                    <v-avatar>
                      <v-icon>check_circle</v-icon>
                    </v-avatar>
                    Confirmada
                  </v-chip>
                  <v-chip v-if="al.status === 'pendiente'" color="default" text-color="black">
                    <v-avatar>
                      <v-icon>schedule</v-icon>
                    </v-avatar>
                    Pendiente
                  </v-chip>
                  <v-chip v-if="al.status === 'revisar'" color="orange" text-color="white">
                    <v-avatar>
                      <v-icon>warning</v-icon>
                    </v-avatar>
                    Dirigirse a Institución
                  </v-chip>
                </div>
              </v-card-text>
              </v-flex>
            </v-layout>
          </v-card>
          </v-flex>
        <!-- </v-data-iterator> -->
        </v-layout>
      </v-container>

        <v-container>
          <v-divider />

          <br>
          <p>
            EN CASO DE NO OBTENER RESULTADOS DE BUSQUEDA, PUEDE REGISTRAR UN ALUMNO NUEVO
          </p>

          <v-btn color="primary" @click="goNewStudent"><v-icon left>person_add</v-icon>Registrar Nuevo Alumno</v-btn>
        </v-container>


      </v-flex>
    </v-container>
</template>

<script>
  import router from '../../router'
  import axios from 'axios'

  export default {
    data: ()=>({
      apigw: process.env.SIEP_API_GW_INGRESS,
      documento_nro:"",
      findPersonaRunning: false,
      resultado:[],
      form:{},

      breadcrumbs: [
        {
          text: 'Paso 1',
          disabled: false
        },
        {
          text: 'Paso 2',
          disabled: false
        },
        {
          text: 'Finalizado',
          disabled: true
        }
      ]
    }),
    created: function(){
      store.commit('updateTitle',"Inscripciones");
      store.dispatch('apiGetAlumnosForFamiliar');
    },
    mounted:function(){
    },
    computed:{
      alumno(){
        return store.state.alumno
      },
      alumnos(){
        console.log(store.getters.alumnos);
        return store.getters.alumnos
      }
    },
    watch:{
      alumnos(){
      }
    },
    methods:{
      startFindPersona:function(){
        let vm = this;
        vm.findPersonaRunning = true;
        vm.resultado = [];
        
        store.dispatch('apiFindPersona',{
          documento_nro:this.documento_nro,
          alumno:1
        })
          .then(function (response) {
            // handle success
            vm.resultado = response.data.data;
            console.log(response.data.data);
            vm.findPersonaRunning = false;
        })
          .catch(function (error) {
            // handle error
            vm.resultado = [];
            console.log(error.response.data);
            vm.findPersonaRunning = false;
          });
      },
      goNewStudent:function(){
        router.push('/inscripciones/alumno');
      },
      goBack:function(){
        router.go(-1);
      },
      goWithSelected:function(alumno){
        console.log(alumno);
        store.dispatch('relateAlumnoFamiliars',alumno);
        // router.push('/inscripciones/finalizar');
      }
    }
  }
</script>

<style scoped>
</style>
