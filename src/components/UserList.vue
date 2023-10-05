<template>
    <tr>
        <td>{{ username }}</td>
        <td>
            <v-dialog v-model="dialog" persistent width="680">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" @click="console.log(user, userId)"><v-icon icon="mdi-pencil"></v-icon></v-btn>
                </template>
                <v-card>
                    <v-form @submit.prevent @submit="onHandlerUpdateUser(userId, user)">
                        <v-card-title>
                            <span class="text-h5">Editar Usuario</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field label="Username*" v-model="user" required variant="outlined"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                                Cerrar
                            </v-btn>
                            <v-btn color="blue-darken-1" variant="text" type="submit">
                                Guardar
                            </v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>

            </v-dialog>

        </td>
        <td><v-btn @click="onHandlerDeleteUser(userId)"><v-icon icon="mdi-trash-can"></v-icon></v-btn></td>
    </tr>
</template>
<script lang="ts">
export default {
    data: () => ({
        dialog: false,

    }),
    props: {
        userId: Number,
        username: String,
    }, 
    setup(props) {
        const user = props.username;
        return{
            user
        }
    },
    methods: {
        onHandlerDeleteUser: function (userId: any) {
            return this.$emit('onHandlerDeleteUser', userId);
        },
        onHandlerUpdateUser: function (userId: any, user: any) {
            return this.$emit('onHandlerUpdateUser', userId, user);
        },
    },
}
</script>