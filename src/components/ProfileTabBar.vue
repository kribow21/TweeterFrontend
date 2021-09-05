<template>
    <div>
    <v-toolbar dense mobileBreakpoint>
        <template v-slot:extension>
            <v-tabs align-with-title>
            <v-tab
            >Tweets</v-tab>
            <v-tab
            @click="getFollowers"
            >Followers
            </v-tab>
            <v-tab
            @click="getFollowing"
            >Following</v-tab>
            </v-tabs>
        </template>
    </v-toolbar>
<!-- This creates the component PostTweet for each tweet and responds to the emits to update themselves on the profile-->

    <PostTweet 
    @UpdateProfileTabBar="showMyTweets" 
    v-for="tweet in userTweets"
    v-bind:key="tweet.tweetId"
    :username="tweet.username"
    :tweetImageUrl="tweet.tweetImageUrl"
    :content="tweet.content"
    :createdAt="tweet.createdAt"
    :tweetId="tweet.tweetId"
    :userImageUrl="tweet.userImageUrl"
    :userId="tweet.userId"/>
    <component :is="`ProfileTabFollowing`"
    v-for="following in userFollowing"
    v-bind:key="following.userId"
    :username="following.username"
    :imageUrl="following.imageUrl"
    :userId="following.userId"
    :bio="following.bio"/>
    <ProfileTabFollowers
    v-for="follower in userFollowers"
    v-bind:key="follower.userId"
    :username="follower.username"
    :imageUrl="follower.imageUrl"
    :userId="follower.userId"
    :bio="follower.bio"/>
    </div>

</template>

<script>
import axios from "axios";
import PostTweet from './PostTweet.vue'
import ProfileTabFollowing from './ProfileTabFollowing.vue'
import ProfileTabFollowers from './ProfileTabFollowers.vue';
    export default {
        name : 'ProfileTabBar',
        components: {
            PostTweet,
            ProfileTabFollowing,
            ProfileTabFollowers
        },
        data() {
            return {
                userTweets : [],
                userFollowing: [],
                userFollowers:[]
            }
        },
        props: {
            userId : String,
        },
        mounted () {
            this.showMyTweets();
        },
        //whatever user is signed in will call for all their tweets when they enter the profile page//
        methods: {
            showMyTweets() {
                axios.request({
                    url : "https://tweeterest.ml/api/tweets",
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
                        this.userTweets = response.data.reverse();
                }).catch((error) => {
                    console.error("There was an error" +error);
                })
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
                        userId : this.userId
                    }
                }).then((response) => {
                    console.log(response); 
                        this.userFollowers = response.data.reverse();
                }).catch((error) => {
                    console.error("There was an error" +error);
                })
            },
            getFollowing(){
                axios.request({
                    url : "https://tweeterest.ml/api/follows",
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
                        this.userFollowing = response.data.reverse();
                }).catch((error) => {
                    console.error("There was an error" +error);
                })
            }
        }
    }
</script>

<style scoped>
div{
    margin: 0 10% 3% 10%;
}
.v-tab{
    margin: 0%;
}
</style>
