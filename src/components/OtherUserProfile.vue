<template>
    <v-container>
        <!-- top part of other user page(before tab bar)-->
        <v-row>
            <v-col>
                <img :src="userPic" alt="profile picture">
            </v-col>
            <v-col>
                <h3>{{username}}</h3>
                <p>{{proBio}}</p>
            <v-btn
                v-if="state == 'following'"
                @click="followButtonClick"
                color="accent"
                elevation="2"
                raised
            >Follow Me</v-btn>
            <v-btn
            v-else
                @click="followButtonClick"
                color="accent"
                elevation="2"
                raised
            >Unfollow</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies"
    export default {
        name : 'OtherUserProfile',
        data() {
            return {
                state: 'following',
                userPic: "",
                proBio: "",
                username: "",
                followedUsers: []
            }
        },
        mounted () {
            this.getProfile();
            // this.getFollowers();
        },
        props: {
            userId : String,
        },
        methods: {
            changeState(newState){
                this.state = newState;
            },
            getProfile() {
                    axios.request({
                    url : "https://tweeterest.ml/api/users",
                    method : "GET",
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    params : {
                        userId : this.userId
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
            followButtonClick(){
                if(this.state == 'following'){
                    axios.request({
                        url : "https://tweeterest.ml/api/follows",
                        method : "POST",
                        headers : {
                            'X-Api-Key' : process.env.VUE_APP_API_KEY,
                            'Content-Type': 'application/json'
                        },
                        data : {
                            "loginToken": cookies.get('loginToken'),
                            "followId" : this.userId
                        }
                    }).then((response) => {
                        console.log(response);
                        this.changeState('unfollow');

                    }).catch((error) => {
                        console.error("There was an error" +error);
                })
                }else if (this.state == 'unfollow'){
                    axios.request({
                        url : "https://tweeterest.ml/api/follows",
                        method : "DELETE",
                        headers : {
                            'X-Api-Key' : process.env.VUE_APP_API_KEY,
                            'Content-Type': 'application/json'
                        },
                        data : {
                            "loginToken": cookies.get('loginToken'),
                            "followId" : this.userId
                        }
                    }).then((response) => {
                        console.log(response);
                        this.changeState('following');

                    }).catch((error) => {
                        console.error("There was an error" +error);
                    })
                }
            },
            getFollowers(){
                    axios.request({
                        url : "https://tweeterest.ml/api/followers",
                        method : "GET",
                        headers : {
                            'X-Api-Key' : process.env.VUE_APP_API_KEY,
                            'Content-Type': 'application/json'
                        },
                        params : {
                            "followId" : this.userId
                        }
                    }).then((response) => {
                        console.log(response);
                        this.followedUsers = response.data

                    }).catch((error) => {
                        console.error("There was an error" +error);
                    })
            }
        }
    }
</script>

<style scoped>
img{
    width: 250px;
}
</style>