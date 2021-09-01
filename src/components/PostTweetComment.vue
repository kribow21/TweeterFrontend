<template>
    <div>
            <v-expansion-panels>
            <v-expansion-panel>
            <v-expansion-panel-header>
                        <v-icon color="accent">
                            mdi-comment-text-outline
                        </v-icon>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                        <v-textarea
                            outlined
                            clearable
                            name="input-7-4"
                            label="Create A Comment"
                            v-model="commentInput"
                        ></v-textarea>
                        <v-btn
                            color="primary"
                            elevation="2"
                            raised
                        >Post</v-btn>
            </v-expansion-panel-content>
            <v-expansion-panel-content>
                <h4>{{username}}</h4>
                <h6>{{createdAt}}</h6>
                <p>{{content}}</p>
                        <v-icon 
                        color="accent">
                        mdi-emoticon-happy-outline
                        </v-icon>
                        <v-icon 
                        color="accent">
                        mdi-emoticon-happy
                        </v-icon>
            </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies"
    export default {
        name : 'PostTweetComment',
        props: {
            commentId: Number,
            content: String,
            createdAt: String,
            tweetId: Number,
            userId: Number,
            username: String
        },
        data() {
            return {
                commentInput: ""
            }
        },
        methods: {
            postComment() {
                axios.request({
                    url : "https://tweeterest.ml/api/comments",
                    method : "POST",
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        "loginToken": cookies.get('loginToken'),
                        "tweetId": this.tweetId,
                        "content": this.commentInput
                    }
                }).then((response) => {
                    console.log(response);
                    this.tweetComments = response.data;

                }).catch((error) => {
                    console.error("There was an error" +error);
                    console.log(error.response);
                })
            }
        },
    }
</script>

<style scoped>

</style>