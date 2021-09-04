<template>
    <div>
        <h1>Home Feed</h1>
        <!-- Basically the feed page container , has the input to make a tweet and renders the tweets on the feed-->
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
            v-for="tweet in followedTweets"
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
                signedInFollows: [],
                followedTweets: []
            }
        },
        mounted () {
            this.whoSignedInFollows();
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
                    this.whoSignedInFollows()

                }).catch((error) => {
                    console.error("There was an error" +error);

                })

            },
            //collects the objects from each user that the current logged in user follows.the loop iterates to get their userId's
            //then calls the function below using that id it loops through 
            whoSignedInFollows(){
                    axios.request({
                        url : "https://tweeterest.ml/api/follows",
                        method : "GET",
                        headers : {
                            'X-Api-Key' : process.env.VUE_APP_API_KEY,
                            'Content-Type': 'application/json'
                        },
                        params : {
                            "userId" : cookies.get('userId')
                        }
                    }).then((response) => {
                        this.signedInFollows = response.data;
                        for(let i =0; i < this.signedInFollows.length; i++){
                            this.idsOfPeopleUserFollows = this.signedInFollows[i].userId;
                            this.collectFollowedUsersTweets(this.signedInFollows[i].userId);
                        }

                    }).catch((error) => {
                        console.error("There was an error" +error);
                    })
            },
            // pushes the tweets into one array that then sorts them from newest to oldest
            collectFollowedUsersTweets(a){
                    axios.request({
                        url : "https://tweeterest.ml/api/tweets",
                        method : "GET",
                        headers : {
                            'X-Api-Key' : process.env.VUE_APP_API_KEY,
                            'Content-Type': 'application/json'
                        },
                        params : {
                            "userId" : a
                        }
                    }).then((response) => {
                        this.followedTweets = this.followedTweets.concat(response.data)
                        this.followedTweets.sort(this.compareTimes)
                        console.log(this.followedTweets);


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