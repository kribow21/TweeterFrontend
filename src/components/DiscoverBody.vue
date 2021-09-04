<template>
    <div>
        <h1>Discover</h1>
        <v-textarea
            outlined
            clearable
            name="input-7-4"
            label="Create A Tweet"
            v-model="tweetInput"
        ></v-textarea>
        <v-btn
            @click="submitTweet()"
            color="primary"
            elevation="2"
            raised
        >Post</v-btn>
        <PostTweet
            @UpdateDiscoverBody="showAllTweets"
            v-for="tweet in allTweets"
            v-bind:key="tweet.tweetId"
            :username="tweet.username"
            :tweetImageUrl="tweet.tweetImageUrl"
            :content="tweet.content"
            :createdAt="tweet.createdAt"
            :tweetId="tweet.tweetId"
            :userImageUrl="tweet.userImageUrl"
            :userId="tweet.userId"/>
    </div>
</template>

<script>
import axios from "axios";
import PostTweet from './PostTweet.vue'
import cookies from "vue-cookies"
    export default {
        name : 'DiscoverBody',
        components: {
            PostTweet,
        },
        data() {
            return {
                allTweets:[],
                tweetInput:""
            }
        },
        mounted () {
            this.showAllTweets();
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
                    this.showAllTweets();

                }).catch((error) => {
                    console.error("There was an error" +error);

                })

            },
            showAllTweets() {
                axios.request({
                    url : "https://tweeterest.ml/api/tweets",
                    method : "GET",
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'Content-Type': 'application/json'
                    },
                }).then((response) => {
                    console.log(response); 
                        this.allTweets = response.data.sort(this.compareTimes)
                }).catch((error) => {
                    console.error("There was an error" +error);
                })
            },
                    //used to sort the tweets to show newest to oldest
            compareTimes(a,b){
                if(a.createdAt > b.createdAt){
                    return -1;
                    //if -1 is returned a is newest
                }else if (a.createdAt < b.createdAt){
                    //if 1 is returned a is oldest
                    return 1
                }
            }
        },
    }
</script>

<style scoped>
div{
    margin: 3% 10% 0 10%;
}
</style>