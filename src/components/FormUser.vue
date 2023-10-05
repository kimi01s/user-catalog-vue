<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent width="680">
            <template v-slot:activator="{ props }">
                <v-btn color="primary" v-bind="props">
                    Nuevo Usuario
                </v-btn>
            </template>
            <v-card>
                <v-form @submit.prevent @submit="onHandlerSubmit(form)">
                    <v-card-title>
                        <span class="text-h5">Nuevo Usuario</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field v-model="form.username" label="Username*" required
                                        variant="outlined"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="form.password" label="Password" type="password" autocomplete="on"
                                        variant="outlined"></v-text-field>
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
    </v-row>
</template>

<script lang="ts">
export default {
    data: () => ({
        form: {
            username: '',
            password: '',
        },
        dialog: false,

    }),
    methods: {
        onHandlerSubmit: function (user: any) {
            if (user.username != "" && user.password != "") {
                this.$emit('onHandlerSubmit', user);
                this.form.password = '';
                return this.form.username = '';
            }
            alert('debe rellenar los campos')
        }
    }
}
</script>