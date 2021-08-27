<template>
    <div>

    </div>
</template>

<script>
import axios from "axios";
    export default {
        name : 'DiscoverFeed',
        data() {
            return {
                usersPic: [],
                userProfilename: [],
                tweetContent: [],
                timeStamp: [],
                tweetID: [],
                usersID: [],
            }
        },
        mounted () {
            this.loadAllTweets();
        },
        methods: {
            loadAllTweets() {
                axios.request({
                    url : "https://tweeterest.ml/api/tweets",
                    method : "GET",
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'Content-Type': 'application/json'
                    },
                }).then((response) => {
                    console.log(response);
                        
                }).catch((error) => {
                    console.error("There was an error" +error);
                })
            }
        },
    }
</script>

<style scoped>

</style>