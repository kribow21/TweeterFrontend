<template>
    <div>
        <!-- Basically the feed page container , has the input to make a tweet and renders the tweets on the feed-->
        <v-textarea
            outlined
            clearable
            name="input-7-4"
            label="Create A Tweet"
            v-model="tweetInput"
        ></v-textarea>
        <v-btn
            @click="submitTweet(); getAllTweets()"
            color="primary"
            elevation="2"
            raised
        >Post</v-btn>
        <PostTweet  
        @UpdateProfileTweets="getAllTweets"  
            v-for="tweet in feedTweets"
            v-bind:key="tweet.tweetId"
            :username="tweet.username"
            :tweetImageUrl="tweet.tweetImageUrl"
            :content="tweet.content"
            :createdAt="tweet.createdAt"
            :tweetId="tweet.tweetId"
            :imageUrl="tweet.imageUrl"
            :userId="tweet.userId"/>
    </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies"
import PostTweet from './PostTweet.vue';
    export default {
        name : 'FeedBody',
        components: { 
            PostTweet
            },

        data() {
            return {
                tweetInput: "",
                feedTweets:[],
            }
        },
        //passes tweet input to api //
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
            //makes the call to get all the tweets and fires when a tweet is edited or deleted//
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
            },
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