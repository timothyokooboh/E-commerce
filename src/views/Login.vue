<template>
    <div class="register">
        <v-container>

            <v-snackbar top :timeout="4000" v-model="errorSnackbar" color="#a72693" class="white--text">
                Username or Password is invalid
            </v-snackbar>

            <v-card>
                
                <v-card-title class="my-5"> Login </v-card-title>

                <v-form ref="form" @submit="submit" class="mx-5">
                    <v-text-field
                        v-model = "email"
                        label = "Email Address"
                        type = "email"
                        append-icon = "mdi-email"
                        outlined
                        shaped
                        autocomplete                       
                        :rules = "emailRules"
                    >
                    </v-text-field>

                    <v-text-field
                        v-model = "password"
                        label = "Password"
                        type = "password"
                        append-icon = "mdi-key"
                        outlined
                        shaped
                        :rules = "passwordRules"
                    >
                    </v-text-field>

                    <v-btn type="submit"  :loading ="loadingContent" width = "100%" rounded color = "#241663" class = "white--text mb-5">Log In</v-btn>
                </v-form>
            </v-card>
        </v-container>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
           
            emailRules: [
                v => !!v || "Email is required",
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
            ],
            passwordRules: [
                v => !!v || "Password is required",
                v => v.length >=8 || "Password must be at least 8 characters"
            ]
        }
    },
    computed: {
        email: {
            get() {
                return this.$store.state.email
            },
            set(val) {
                this.$store.state.email = val
            }
        },
        password: {
            get() {
                return this.$store.state.password
            },
            set(val) {
                this.$store.state.password = val
            }
        },
        loadingContent: {
            get() {
                return this.$store.state.loadingContent
            },
            set(val) {
                this.$store.state.loadingContent = val
            }
        },
        successSnackbar: {
            get() {
                return this.$store.state.successSnackbar
            },
            set(val) {
                this.$store.state.successSnackbar = val
            }
        },
        errorSnackbar: {
            get() {
                return this.$store.state.errorSnackbar
            },
            set(val) {
                this.$store.state.errorSnackbar = val
            }
        }
    },
    methods: {
       submit(e) {
           if(this.$refs.form.validate()) {
               this.$store.dispatch("aLogin")
               return true
           }
           e.preventDefault()
       }
    }
}
</script>

<style scoped>
    .register {
        width: 100%;
        height: 100%;
        background: var(--primary-color)
    }
</style>