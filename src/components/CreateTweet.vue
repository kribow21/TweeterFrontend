<template>
    <div>
        <v-textarea
        outlined
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
        <div>

        </div>
    </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies"
    export default {
        name : 'CreateTweet',
        data() {
            return {
                tweetInput: "",
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
            }
        },
    }
</script>

<style scoped>

</style>