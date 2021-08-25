<template>
    <v-container>
        <v-row>
            <v-col>
                <img :src="userPic" alt="profile picture">
            </v-col>
            <v-col>
                <h3>{{username}}</h3>
                <p>{{proBio}}</p>
            </v-col>
        </v-row>
            <v-btn
            @click="deleteProfile"
            color="primary"
            elevation="2"
            raised
            >Delete Profile</v-btn>
    </v-container>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies"
    export default {
        name : 'UserProfile',
        data() {
            return {
                userPic: "",
                proBio: "",
                username: "",

            }
        },
        mounted () {
            this.getProfile();
        },
        methods: {
            getProfile() {
                    axios.request({
                    url : "https://tweeterest.ml/api/users",
                    method : "GET",
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    params : {
                        userId : cookies.get('userId')
                    }
                }).then((response) => {
                    console.log(response);
                    this.userPic = response.data[0].imageUrl;
                    this.username = response.data[0].username;
                    this.proBio = response.data[0].bio;
                    

                }).catch((error) => {
                    console.error("There was an error" +error);
                })
            },
            deleteProfile(){
                    axios.request({
                    url : "https://tweeterest.ml/api/users",
                    method : "DELETE",
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    params : {
                        loginToken : cookies.get('loginToken'),
                        password : "",
                    }
                }).then((response) => {
                    console.log(response);    

                }).catch((error) => {
                    console.error("There was an error" +error);
                })
            }
            }
        }
</script>

<style scoped>
img{
    width: 200px;
}
.container{
    display: grid;
    justify-content: center;

}
</style>