<template>
    
    <v-form>
        <router-link to="/">Login</router-link>
        <router-link to="/signup">Sign Up</router-link>
        <!-- signup form-->
    <v-container>
    <v-row>
        <v-col
        cols="12" class="align-self-md-center">
            <v-img
            max-height="280"
            max-width="250"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzjMyQtDIsNe5jSvv7pd37B-Ku0sjD_UX4jQ&usqp=CAU"
            ></v-img>
            <h1>Join Tweeter</h1>
        </v-col>

        <v-col
            cols="12"
            sm="6"
            md="5"
        >
        <v-text-field
            label="Email"
            v-model="userEmail"
            :rules="emailRules"
            outlined
            clearable
        ></v-text-field>
                <v-text-field
            label="Username"
            v-model="userUsername"
            outlined
            clearable
        ></v-text-field>
                <v-text-field
            label="Password"
            v-model="userPassword"
            :type="'password'"
            outlined
            clearable
        ></v-text-field>
        </v-col>
        <v-col
            cols="12"
            sm="6"
            md="5"
        >
        <v-text-field
            label="Profile Bio"
            v-model="proBio"
            outlined
            clearable
        ></v-text-field>
        <v-text-field
            label="Profile Pic URL"
            v-model="proPic"
            outlined
            clearable
        ></v-text-field>
                <v-text-field
            label="YYYY-MM-DD"
            v-model="birthday"
            outlined
            clearable
        ></v-text-field>
            <v-btn
            @click="makeSignupCall"
            color="primary"
            elevation="2"
            raised
            >Sign Up</v-btn>
            <h3 id="failResponse"></h3>
        </v-col>
        
    </v-row>
    </v-container>
    </v-form>    
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies"

    export default {
        name : 'SignupInput',
        data() {
            //input that corresponds with v-model value gets stored here then passed to signup api call//
            return {
                userEmail : "",
                userUsername : "",
                userPassword : "",
                proBio : "",
                birthday : "",
                proPic : "",
                emailRules: [
                    v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
            }
        },
        methods: {
            makeSignupCall() {
                axios.request({
                    url : `${process.env.VUE_APP_BASE_DOMAIN}/api/users`,
                    method : "POST",
                    headers : {
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
                    cookies.set('loginToken', response.data.loginToken)
                    cookies.set('userId', response.data.userId);
                    this.$router.push('Profile');
                    }).catch((error) => {
                    console.error("There was an error" +error);
                    document.getElementById('failResponse').innerText="Failed to signup"

                    })
                }
        }
        
    }
</script>

<style scoped>
.row{
    justify-content: center;
}
h1{
    color: rgb(170, 54, 216);
}
</style>