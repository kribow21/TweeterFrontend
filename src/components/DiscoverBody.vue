<template>
    <div>
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
    export default {
        name : 'DiscoverBody',
        components: {
            PostTweet,
        },
        data() {
            return {
                allTweets:[]
            }
        },
        mounted () {
            this.showAllTweets();
        },
        methods: {
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