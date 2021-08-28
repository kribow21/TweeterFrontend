<template>
    <div>
        <v-textarea
            outlined
            clearable
            name="input-7-4"
            label="Create A Tweet"
            v-model="tweetInput"
        ></v-textarea>
        <v-btn
            @click="submitTweet"
            color="primary"
            elevation="2"
            raised
        >Post</v-btn>
        <FeedPostTweet  
        @UpdateProfileTweets="getAllTweets"  
            v-for="tweet in feedTweets"
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
import FeedPostTweet from './FeedPostTweet.vue';
    export default {
        name : 'CreateTweet',
        components: { 
            FeedPostTweet
            },

        data() {
            return {
                tweetInput: "",
                feedTweets:[]
            }
        },
        methods: {
            submitTweet() {
                axios.request({
                    url : "https://tweeterest.ml/api/tweets",
                    method : "POST",
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    data : {
                        "loginToken" : cookies.get('loginToken'),
                        "content" : this.tweetInput
                    }
                }).then((response) => {
                    console.log(response);

                }).catch((error) => {
                    console.error("There was an error" +error);

                })
            },
            getAllTweets() {
                axios.request({
                    url : "https://tweeterest.ml/api/tweets",
                    method : "GET",
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    console.log(response);
                    this.feedTweets = response.data.reverse();

                }).catch((error) => {
                    console.error("There was an error" +error);
                })
            }
        },
        mounted () {
            this.getAllTweets();
        },
    }
</script>

<style scoped>
div{
    margin: 3% 10% 0 10%;
}
</style>