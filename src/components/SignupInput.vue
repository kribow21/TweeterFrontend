<template>
    <v-form>
    <v-container>
        <v-row>
        <v-col
            cols="12"
            sm="6"
            md="3"
        >
        <v-text-field
            label="Email"
            v-model="userEmail"
            outlined
        ></v-text-field>
        </v-col>
        <v-col
            cols="12"
            sm="6"
            md="3"
        >
        <v-text-field
            label="Username"
            v-model="userUsername"
            outlined
        ></v-text-field>
        </v-col>
            <v-col
            cols="12"
            sm="6"
            md="3"
        >
        <v-text-field
            label="Password"
            v-model="userPassword"
            :type="'password'"
            outlined
        ></v-text-field>
        </v-col>
        <v-col
            cols="12"
            sm="6"
            md="3"
        >
        <v-text-field
            label="Profile Bio"
            v-model="proBio"
            outlined
        ></v-text-field>
        </v-col>
        <v-col
            cols="12"
            sm="6"
            md="3"
        >
        <v-text-field
            label="Profile Pic"
            v-model="proPic"
            outlined
        ></v-text-field>
        </v-col>
        <v-col
            cols="12"
            sm="6"
            md="3"
        >
        <v-text-field
            label="YYYY-MM-DD"
            v-model="birthday"
            outlined
        ></v-text-field>
        </v-col>
        
    </v-row>
            <v-btn
            @click="makeSignupCall"
            color="primary"
            elevation="2"
            raised
            >Sign Up</v-btn>
    </v-container>
    </v-form>    
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies"
    export default {
        name : 'SignupInput',
        data() {
            return {
                userEmail : "",
                userUsername : "",
                userPassword : "",
                proBio : "",
                birthday : "",
                proPic : "",
            }
        },
        methods: {
            makeSignupCall() {
                axios.request({
                    url : "https://tweeterest.ml/api/users",
                    method : "POST",
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    data : 
                        { 
                        "email": this.userEmail,
                        "username": this.userUsername,
                        "password": this.userPassword,
                        "bio": this.proBio,
                        "birthdate": this.birthday,
                        "imageUrl": this.proPic,
                        }
                    }).then((response) => {
                    console.log(response);
                    cookies.set('loginToken', response.data.loginToken)
                    }).catch((error) => {
                    console.error("There was an error" +error);
                    console.log(this.email)
                    })
                }
        }
        
    }
</script>

<style scoped>

</style>