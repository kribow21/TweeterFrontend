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
                v-if="isFollowing == false"
                @click="followButtonClick"
                color="accent"
                elevation="2"
                raised
            >Follow Me</v-btn>
            <v-btn
                v-else
                @click="followButtonClick"
                color="secondary"
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
                isFollowing: false,
                userPic: "",
                proBio: "",
                username: "",
                followedUsers: [],
                authenticated : cookies.get('userId'),
            }
        },
        mounted () {
            this.getProfile();
            this.getFollows();
        },
        props: {
            userId : String,
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
                        userId : this.userId
                    }
                }).then((response) => {
                    this.userPic = response.data[0].imageUrl;
                    this.username = response.data[0].username;
                    this.proBio = response.data[0].bio;
                    
                }).catch((error) => {
                    console.error("There was an error" +error);
                })
            },
            followButtonClick(){
                if(this.isFollowing == false){
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
                    }).then(() => {
                        this.getFollows();

                    }).catch((error) => {
                        console.error("There was an error" +error);
                })
                }else if (this.isFollowing == true){
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
                    }).then(() => {
                        this.getFollows();

                    }).catch((error) => {
                        console.error("There was an error" +error);
                    })
                }
            },
            //conditional rendering method to determine what follow/unfollow button is displayed
            getFollows(){
                    axios.request({
                        url : "https://tweeterest.ml/api/follows",
                        method : "GET",
                        headers : {
                            'X-Api-Key' : process.env.VUE_APP_API_KEY,
                            'Content-Type': 'application/json'
                        },
                        params : {
                            "userId" : this.authenticated
                        }
                    }).then((response) => {
                        this.followedUsers = response.data
                        let filteredFollower = this.followedUsers.filter(this.isFollowedByUser)
                        if(filteredFollower.length == 0){
                            this.isFollowing = false
                        }else{
                            this.isFollowing = true
                        }

                    }).catch((error) => {
                        console.error("There was an error" +error);
                    })
            },
            isFollowedByUser(user){
                if(user.userId == this.userId){
                    return true
                }else{
                    return false
                }
            }
        }
    }
</script>

<style scoped>
img{
    width: 250px;
}
.container{
    background-color: rgb(170, 54, 216);
    color: white;
    width: 80%;
}
</style>