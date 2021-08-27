<template>
    <v-container>
        <v-row>
            <v-col>
                <img :src="userPic" alt="profile picture">
            </v-col>
            <v-col>
                <h3>{{username}}</h3>
                <p>{{proBio}}</p>
                <ProfileEditComp/>
                <ProfileDeleteComp/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies"
import ProfileEditComp from './ProfileEditComp.vue'
import ProfileDeleteComp from './ProfileDeleteComp.vue'
    export default {
        name : 'UserProfile',
        components: {
            ProfileEditComp,
            ProfileDeleteComp
        },
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
            }
        }
</script>

<style scoped>
img{
    width: 250px;
}
</style>