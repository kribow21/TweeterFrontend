<template>
    <div>
    <v-toolbar dense>
        <template v-slot:extension>
            <v-tabs align-with-title>
            <v-tab
            @click="showMyTweets"
            >Tweets</v-tab>
            <v-tab>Followers</v-tab>
            <v-tab>Following</v-tab>
            <v-tab>Likes</v-tab>
            </v-tabs>
        </template>
    </v-toolbar>
    <FeedPostTweet 
    @UpdateUserTweets="showMyTweets" v-for="tweet in userTweets"
    v-bind:key="tweet.tweetId"
    :username="tweet.username"
    :tweetImageUrl="tweet.tweetImageUrl"
    :content="tweet.content"
    :createdAt="tweet.createdAt"
    :tweetId="tweet.tweetId"
    :imageUrl="tweet.imageUrl"/>
    </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies"
import FeedPostTweet from './FeedPostTweet.vue'
    export default {
        name : 'ProfileTabBar',
        components: {
            FeedPostTweet,
        },
        data() {
            return {
                userTweets : []
            }
        },
        mounted () {
            this.showMyTweets();
        },
        methods: {
            showMyTweets() {
                console.log("updating tweets");
                axios.request({
                    url : "https://tweeterest.ml/api/tweets",
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
                        this.userTweets = response.data.reverse();
                }).catch((error) => {
                    console.error("There was an error" +error);
                })
            },
        }
    }
</script>

<style scoped>
#tweet{
    margin-top: 3%;
}
</style>
