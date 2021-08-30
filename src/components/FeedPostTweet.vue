<template>
    <div>
        <!-- responsible for all individual tweet components on website. Feedbody passes the input to this component-->

        <v-card
        class="mx-auto"
        color="primary"
        dark
        max-width="100%"
        >
        <v-card-title>
            <v-list-item-avatar color="grey darken-3">
                <img
                class="elevation-6"
                alt="user"
                src="imageUrl"
                >
            </v-list-item-avatar>
        <!-- dynamic route for other users profile viewing-->

            <v-list-item-content>
                <v-list-item-title>
                    <router-link :to="'user/'+ userId ">{{username}}</router-link>
                </v-list-item-title>
            </v-list-item-content>
            <v-icon
                large
                left
                >
                mdi-twitter
            </v-icon>
            <span class="text-h6 font-weight-light">Tweeter</span>
        </v-card-title>
            <v-card-text class="text-h5 font-weight-bold">
                {{content}}
            </v-card-text>
        <!-- bottom part of card, holds the buttons to edit comment/like tweets-->
        <v-card-actions>
<!-- this action will be shown only on your own tweets-->
        <v-list-item class="grow">
            <v-row
                align="center"
                justify="end"
            >
                <!-- form for commenting on tweet-->
            <v-icon @click="clickToComment" class="mr-1">
                mdi-comment-text-outline
                </v-icon>
                        <div :class="{CommentForm : isComment}">
                        <v-col
                            cols="12"
                            sm="10"
                        >
                        <v-text-field
                            label="comment"
                            v-model="tweetComment"
                            outlined
                        ></v-text-field>
                        <v-btn
                            @click="commentTweet"
                            color="primary"
                            elevation="2"
                            raised
                        >Apply</v-btn>
                        </v-col>
                        </div>
                <!-- form for editing tweet-->
                <v-icon @click="clickToEdit" class="mr-1">
                mdi-comment-edit-outline
                </v-icon>
                        <div :class="{EditForm : isForm}">
                        <v-col
                            cols="12"
                            sm="10"
                        >
                        <v-text-field
                            label="edited tweet"
                            v-model="editedContent"
                            outlined
                        ></v-text-field>
                        <v-btn
                                @click="editTweet"
                                color="primary"
                                elevation="2"
                                raised
                            >Apply</v-btn>
                            
                        </v-col>
                        </div>
                <v-icon @click="deleteTweet" class="mr-1">
                mdi-comment-remove-outline
                </v-icon>
            </v-row>
            </v-list-item>
        </v-card-actions>
        <!--Like and Comment Buttons Start here-->
<!-- this action will be shown only on other users tweets-->
    
        <v-card-actions>
        <v-list-item class="grow">
            <v-row
                align="center"
                justify="end"
            >
                <!-- form for commenting on tweet-->
                    <v-btn
                        @click="clickToComment"
                        class="ma-2"
                        small
                        outlined
                        fab
                        color="white"
                        >
                        <v-icon class="mr-1">mdi-comment-text-outline</v-icon>
                    </v-btn>

                        <div :class="{CommentForm : isComment}">
                        <v-col
                            cols="12"
                            sm="10"
                        >
                        <v-text-field
                            label="comment"
                            v-model="tweetComment"
                            outlined
                        ></v-text-field>
                        <v-btn
                            @click="commentTweet"
                            color="primary"
                            elevation="2"
                            raised
                        >Apply</v-btn>
                        </v-col>
                        </div>

                    <v-btn
                        @click="likeTweet"
                        class="ma-2"
                        small
                        outlined
                        fab
                        color="white"
                        >
                        <v-icon class="mr-1">mdi-thumb-up</v-icon>
                    </v-btn>
                    <v-btn
                        @click="dislikeTweet"
                        class="ma-2"
                        small
                        outlined
                        fab
                        color="white"
                        >
                        <v-icon class="mr-1">mdi-thumb-down</v-icon>
                    </v-btn>
            </v-row>
            </v-list-item>
        </v-card-actions>
                <!-- block of code that holds comment content and who created the comment-->
                <v-list-item-content>
                    <span class="text-h6 font-weight-light">Comments</span>
                    <router-link :to="'user/'+ userId ">commenters username</router-link>
                    <v-card-text class="text-h6 font-weight-bold">
                    Tweets comment goes here
                    </v-card-text>
                                <v-card-actions>
<!-- this action will be shown only on your own comments-->
        <v-list-item class="grow">
            <v-row
                align="center"
                justify="end"
            >
                <!-- form for commenting on tweet-->
            <v-icon @click="clickToComment" class="mr-1">
                mdi-comment-text-outline
                </v-icon>
                        <div :class="{CommentForm : isComment}">
                        <v-col
                            cols="12"
                            sm="10"
                        >
                        <v-text-field
                            label="comment"
                            v-model="tweetComment"
                            outlined
                        ></v-text-field>
                        <v-btn
                            @click="commentTweet(); getComments()"
                            color="primary"
                            elevation="2"
                            raised
                        >Apply</v-btn>
                        </v-col>
                        </div>
                <!-- form for editing comment-->
                <v-icon class="mr-1">
                mdi-comment-edit-outline
                </v-icon>
                        <div :class="{EditCommentForm : isForm}">
                        <v-col
                            cols="12"
                            sm="10"
                        >
                        <v-text-field
                            label="edited comment"
                            v-model="yourEditedComment"
                            outlined
                        ></v-text-field>
                        <v-btn
                                color="primary"
                                elevation="2"
                                raised
                            >Apply</v-btn>
                            
                        </v-col>
                        </div>
                <v-icon class="mr-1">
                mdi-comment-remove-outline
                </v-icon>
            </v-row>
            </v-list-item>
        </v-card-actions>
        <!--comment like buttons start here-->
<!-- this action will be shown only on other users comments-->
    
        <v-card-actions>
        <v-list-item class="grow">
            <v-row
                align="center"
                justify="end"
            >
                    <v-btn
                        @click="likeTweet"
                        class="ma-2"
                        small
                        outlined
                        fab
                        color="white"
                        >
                        <v-icon class="mr-1">mdi-thumb-up</v-icon>
                    </v-btn>
                    <v-btn
                        @click="dislikeTweet"
                        class="ma-2"
                        small
                        outlined
                        fab
                        color="white"
                        >
                        <v-icon class="mr-1">mdi-thumb-down</v-icon>
                    </v-btn>
            </v-row>
            </v-list-item>
        </v-card-actions>
                </v-list-item-content>
    </v-card>
    </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies"
    export default {
        name : 'FeedPostTweet',
        props : {
            //tweet response from feedbody//
            username : String,
            tweetImageUrl: String,
            content : String,
            createdAt: String,
            tweetId: Number,
            imageUrl: String,
            userId: Number,
        },
        data() {
            return {
                isForm: true,
                editedContent: "",
                isComment: true,
                tweetComment: "",
                yourEditedComment: ""
            }
        },
        methods: {
                    //shows input so the user can change tweets content//
            clickToEdit(){
                if (this.isForm == true){
                    this.isForm = false
                }else if(this.isForm == false){
                    this.isForm = true
                }
            },
            //emits to FeedBody that it needs to edit itself with the changes made
            editTweet() {
                axios.request({
                    url : "https://tweeterest.ml/api/tweets",
                    method : "PATCH",
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        "loginToken" : cookies.get('loginToken'),
                        "tweetId": this.tweetId,
                        "content": this.editedContent
                    }
                }).then((response) => {
                    console.log(response);
                    this.$emit('UpdateProfileTweets');

                }).catch((error) => {
                    console.error("There was an error" +error);
                })
            },
            //emits to FeedBody that it needs to edit itself with the changes made
            deleteTweet(){
                axios.request({
                    url : "https://tweeterest.ml/api/tweets",
                    method : "Delete",
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        "loginToken" : cookies.get('loginToken'),
                        "tweetId": this.tweetId,
                    }
                }).then((response) => {
                    console.log(response); 
                    this.$emit('UpdateProfileTweets');
                    
                }).catch((error) => {
                    console.error("There was an error" +error);
                })
            },
            likeTweet(){
                console.log("clicked");
            },
            dislikeTweet(){
                console.log("unclicked");
            },
            clickToComment(){
                if (this.isComment == true){
                    this.isComment = false
                }else if(this.isComment == false){
                    this.isComment = true
                }
            },
            commentTweet(){
                axios.request({
                    url : "https://tweeterest.ml/api/comments",
                    method : "POST",
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        "loginToken" : cookies.get('loginToken'),
                        "tweetId": this.tweetId,
                        "content": this.tweetComment
                    }
                }).then((response) => {
                    console.log(response);
                    this.$emit('UpdateProfileTweets');

                }).catch((error) => {
                    console.error("There was an error" +error);
                })
            },
            getComments(){
                axios.request({
                    url : "https://tweeterest.ml/api/comments",
                    method : "GET",
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        "tweetId": this.tweetId
                    }
                }).then((response) => {
                    console.log(response);
                    this.feedComments = response.data.reverse();

                }).catch((error) => {
                    console.error("There was an error" +error);
                })
            }
        }
    }
</script>

<style scoped>
.EditForm{
    display: none;
}
.CommentForm{
    display: none;
}
.EditCommentForm{
    display: none;
}
.v-application a{
    color: white;
}

</style>
