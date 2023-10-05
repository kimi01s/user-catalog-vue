<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <h1>Home</h1>
      </v-col>
      <v-col cols="6">
        <!-- <v-btn @click="click()">show list</v-btn> -->
      </v-col>
      <v-col cols="6">
        <h2>Formulario</h2>
      </v-col>
      <v-col cols="6">
        <FormUser @onHandlerSubmit="onHandlerSubmit" :newUser="newUser" />
      </v-col>
      <v-col>
        <v-table>
          <thead>
            <th class="text-left">Nombre de usuario</th>
            <th class="text-left">Editar</th>
            <th class="text-left">Eliminar</th>
          </thead>
          <tbody>
            <UserList v-for="user in listaUsuarios" :key="user.id" :username="user.username" :userId="user.id"
              @onHandlerUpdateUser="onHandlerUpdateUser" @onHandlerDeleteUser="onHandlerDeleteUser" />
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { ref } from 'vue'
import FormUser from './components/FormUser.vue'
import UserList from '@/components/UserList.vue'

const API_URL = 'https://localhost:7087/api/Users';

export default {
  setup() {
    const listaUsuarios = ref([{
      id: 1,
      username: '',
      password: '',
      createdAt: '',
      updatedAt: '',
    }]);

    const newUser = ref({
      username: '',
      password: '',
      createdAt: '',
      updatedAt: ''
    });
    return {
      listaUsuarios,
      newUser
    }
  },
  methods: {
    onHandlerSubmit: function (newUsera: any) {
      const fecha = new Date();
      const fechaToString = fecha.toISOString();

      this.newUser = newUsera;
      this.newUser.createdAt = fechaToString;
      this.newUser.updatedAt = fechaToString;
      this.listaUsuarios.push({
        id: this.listaUsuarios.length + 1,
        username: this.newUser.username,
        password: this.newUser.password,
        createdAt: fechaToString,
        updatedAt: fechaToString
      });

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.newUser)
      };

      this.newUser = {
        username: '',
        password: '',
        createdAt: '',
        updatedAt: ''
      }
      fetch(`${API_URL}/NewUser`, requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));

      console.log(this.listaUsuarios);

    },

    onHandlerDeleteUser: async function (id: any) {
      console.log(`estás eliminando el ${id}`);
      const findUser = this.listaUsuarios.find(user => user.id === id);
      if (findUser != undefined) {
        this.listaUsuarios.splice(this.listaUsuarios.indexOf(id), 1);
        const requestOptions = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(findUser)
        }
        await fetch(`${API_URL}/DeleteUser`, requestOptions);
      }
      console.log(this.listaUsuarios);
    },

    onHandlerUpdateUser: async function (id: any, user: any) {
      console.log(`estás editando el ${id}`);
      const findUser = this.listaUsuarios.find(user => user.id === id);
      if (findUser != undefined) {
        findUser.username = user;
        console.log(findUser);
        const requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(findUser)
        };
        await fetch(`${API_URL}/UpdateUser`, requestOptions);

      }
      console.log(findUser, user);
    },

    listaUsuariosApi: function async() {
      fetch(`${API_URL}/GetUsers`)
        .then(response => response.json())
        .then(data => this.listaUsuarios = data);
    },
    click: function () {
      console.log(this.listaUsuarios);
    }
  },
  mounted() {
    this.listaUsuariosApi();
  },
  components: {
    FormUser,
    UserList,
  }
}
</script>