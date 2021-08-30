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
                v-if="state === 'follow'"
                @click="followOtherUser; changeState('unfollow')"
                color="accent"
                elevation="2"
                raised
            >Follow </v-btn>
            <v-btn
                v-else
                @click="unfollowOtherUser; changeState('follow')"
                color="accent"
                elevation="2"
                raised
            >Unfollow something</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from "axios";
// import cookies from "vue-cookies"
    export default {
        name : 'OtherUserProfile',
        data() {
            return {
                state: 'follow',
                userPic: "",
                proBio: "",
                username: "",
            }
        },
        mounted () {
            this.getProfile();
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
        followOtherUser(){
            console.log("follow");
            // axios.request({
            //         url : "https://tweeterest.ml/api/follows",
            //         method : "POST",
            //         headers : {
            //             'X-Api-Key' : process.env.VUE_APP_API_KEY,
            //             'Content-Type': 'application/json'
            //         },
            //         data : {
            //             "loginToken": cookies.get('loginToken'),
            //             "followId" : this.userId
            //         }
            //     }).then((response) => {
            //         console.log(response);

            //     }).catch((error) => {
            //         console.error("There was an error" +error);
            //     })
        },
        unfollowOtherUser(){
            console.log("unfollow");
                // axios.request({
                //     url : "https://tweeterest.ml/api/follows",
                //     method : "DELETE",
                //     headers : {
                //         'X-Api-Key' : process.env.VUE_APP_API_KEY,
                //         'Content-Type': 'application/json'
                //     },
                //     data : {
                //         "loginToken": cookies.get('loginToken'),
                //         "followId" : this.userId
                //     }
                // }).then((response) => {
                //     console.log(response);

                // }).catch((error) => {
                //     console.error("There was an error" +error);
                // })
        }
        }
    }
</script>

<style scoped>
img{
    width: 250px;
}
</style>