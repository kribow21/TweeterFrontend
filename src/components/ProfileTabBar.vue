<template>
    <div>
    <v-toolbar dense>
        <template v-slot:extension>
            <v-tabs align-with-title>
            <v-tab
            @click="showMyTweets">Tweets</v-tab>
            <v-tab>Followers</v-tab>
            <v-tab>Following</v-tab>
            <v-tab>Likes</v-tab>
            </v-tabs>
        </template>
    </v-toolbar>
    <div id="tweet">
        <h3>{{tweetContent}}</h3>
        <p>{{timeStamp}}</p>
    </div>
    </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies"
    export default {
        name : 'ProfileTabBar',
        data() {
            return {
                tweetContent: "",
                timeStamp: "",
                tweetID: ""
            }
        },
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
                        userId : cookies.get('userId')
                    }
                }).then((response) => {
                    console.log(response); 
                        this.tweetContent = response.data[0].content;
                        this.timeStamp = response.data[0].createdAt;
                        this.tweetID = response.data[0].tweetId;
                }).catch((error) => {
                    console.error("There was an error" +error);
                })
            }
        },
    }
</script>

<style scoped>
#tweet{
    margin-top: 3%;
}
</style>
