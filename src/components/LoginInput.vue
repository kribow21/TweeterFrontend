<template>
        <!-- login form for user to pass authentication from api-->
    <v-form >
        <v-container>
            <v-col
        cols="12">
            <v-img
            max-height="280"
            max-width="250"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzjMyQtDIsNe5jSvv7pd37B-Ku0sjD_UX4jQ&usqp=CAU"
            ></v-img>
        </v-col>
        <v-col
        cols="12">
            <h1>Welcome Tweeter</h1>
        </v-col>
            <v-col
            cols="12"
            >
            <v-text-field
            v-model="userEmail"
            label="Email"
            outlined
            clearable
            ></v-text-field>
        </v-col>
        <v-col
            cols="12"

            >
            <v-text-field
            v-model="userPassword"
            label="Password"
            :type="'password'"
            outlined
            clearable
            ></v-text-field>
        </v-col>
            <v-btn
                @click="makeLoginRequest"
                color="primary"
                elevation="2"
                raised
            >Log In</v-btn>
            <h3 id="failResponse"></h3>
        </v-container>
    </v-form>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies"
    export default {
        name : 'LoginInput',
        data() {
            return {
                userEmail : "",
                userPassword : "",
            }
            },
                methods : {
                    makeLoginRequest : function() {
                    axios.request({
                    url : `${process.env.VUE_APP_BASE_DOMAIN}/api/login`,
                    method : "POST",
                    headers : {
                        'Content-Type': 'application/json'
                    },
                    data : {
                        email : this.userEmail,
                        password : this.userPassword,
                    }
                }).then((response) => {
                    console.log(response);
                    cookies.set('loginToken', response.data.loginToken);
                    cookies.set('userId', response.data.userId);
                    this.$router.push('Profile');

                }).catch((error) => {
                    console.error("There was an error" +error);
                    document.getElementById('failResponse').innerText="Failed to login"
                })
            }
            
        }
    }
</script>

<style scoped>
.container{
    display: grid;
    justify-content: center;
}
h1{
    color: rgb(170, 54, 216);
    
}


</style>