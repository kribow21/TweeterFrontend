<template>
    <div>
        <!-- responsible for all individual tweet components on website. Feedbody/DiscoverBody passes the input to this component-->
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
                :src="userImageUrl"
                >
            </v-list-item-avatar>
        <!-- dynamic route for other users profile viewing-->

            <v-list-item-content>
                <v-list-item-title>
                    <router-link :to="'user/'+ userId ">{{username}}</router-link>
                    <p>{{createdAt}}</p>
                </v-list-item-title>
            </v-list-item-content>
            <v-icon
                small
                left
                >
                mdi-twitter
            </v-icon>
        </v-card-title>
            <v-card-text class="text-h5 font-weight-bold">
                {{content}}
            </v-card-text>
        <!-- bottom part of card, holds the buttons to edit/like/comment-->
        <v-card-actions v-if="this.authenticated == this.userId">
<!-- this action will be shown only on your own tweets-->
        <v-list-item class="grow">
            <v-row
                align="center"
                justify="end"
            >
                <!-- form for editing tweet-->
                <v-icon @click="clickToEdit" class="mr-1"
                color="accent">
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
                <v-icon @click="deleteTweet" class="mr-1"
                color="accent">
                mdi-comment-remove-outline
                </v-icon>
                <v-icon class="mr-1"
                @click="clickToComment"
                color="accent">
                    mdi-comment-text-outline
                </v-icon>
                        <v-badge
                            color="accent"
                            :content="commentCount"
                            >
                        </v-badge>
                        <div :class="{CommentForm : isComment}">
                        <v-col
                            cols="12"
                        >
                        <v-text-field
                            label="comment"
                            v-model="tweetCom"
                            outlined
                        ></v-text-field>
                        <v-btn
                                @click="applyComment"
                                color="primary"
                                elevation="2"
                                raised
                            >Apply</v-btn>
                            
                        </v-col>
                        </div>
                        <v-icon 
                            v-if="isLike == false"
                            @click="likeButtonClick"
                            color="accent">
                            mdi-emoticon-happy-outline
                        </v-icon>
                            <v-icon 
                            @click="likeButtonClick"
                            v-else
                            color="accent">
                            mdi-emoticon-happy
                        </v-icon>
                        <v-badge
                            color="accent"
                            :content="tweetLikeCount"
                            >
                        </v-badge>
            </v-row>
            </v-list-item>
        </v-card-actions>
                <!-- actions shown on tweets that are NOT the user logged in-->
        <v-card-actions v-else>
                <v-icon class="mr-1"
                @click="clickToComment"
                color="accent">
                    mdi-comment-text-outline
                </v-icon>
                        <v-badge
                            color="accent"
                            :content="commentCount"
                            >
                        </v-badge>
                    <div :class="{CommentForm : isComment}">
                        <v-col
                            cols="12"
                            sm="10"
                        >
                        <v-text-field
                            label="comment"
                            v-model="tweetCom"
                            outlined
                        ></v-text-field>
                        <v-btn
                                @click="applyComment"
                                color="primary"
                                elevation="2"
                                raised
                            >Apply</v-btn>
                            
                        </v-col>
                    </div>
                        <v-icon 
                            v-if="isLike == false"
                            @click="likeButtonClick"
                            color="accent">
                            mdi-emoticon-happy-outline
                        </v-icon>
                        <v-icon
                            @click="likeButtonClick"
                            v-else
                            color="accent">
                            mdi-emoticon-happy
                        </v-icon>
                        <v-badge
                            color="accent"
                            :content="tweetLikeCount"
                            >
                        </v-badge>
        </v-card-actions>
    </v-card>
    <PostTweetComment
    @updatePostTweet="getComments"
    v-for="comment in tweetComments"
    v-bind:key="comment.commentId"
    :commentId="comment.commentId"
    :content="comment.content"
    :createdAt="comment.createdAt"
    :tweetId="comment.tweetId"
    :userId="comment.userId"
    :username="comment.username"
    />
    </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies"
import PostTweetComment from './PostTweetComment.vue';
    export default {
        name : 'FeedPostTweet',
        components: {
            PostTweetComment
        },
        props : {
            //tweet response from feedbody//
            username : String,
            tweetImageUrl: String,
            content : String,
            createdAt: String,
            tweetId: Number,
            userImageUrl: String,
            userId: Number,
        },
        mounted () {
            this.getComments();
            this.getTweetLikes();
        },
        data() {
            return {
                isForm: true,
                isComment: true,
                editedContent: "",
                authenticated : cookies.get('userId'),
                tweetComments: [],
                isLike: false,
                tweetLikeCount: "",
                likingUsers: [],
                tweetCom: "",
                commentCount: ""
            }
        },
        methods: {
                    //shows input so the user can change tweets/comments content with class binding//
            clickToEdit(){
                if (this.isForm == true){
                    this.isForm = false
                }else if(this.isForm == false){
                    this.isForm = true
                }
            },
            clickToComment(){
                if (this.isComment == true){
                    this.isComment = false
                }else if(this.isComment == false){
                    this.isComment = true
                }
            },
            likeButtonClick(){
                if(this.isLike == false){
                    console.log('false');
                    axios.request({
                        url : "https://tweeterest.ml/api/tweet-likes",
                        method : "POST",
                        headers : {
                            'X-Api-Key' : process.env.VUE_APP_API_KEY,
                            'Content-Type': 'application/json'
                        },
                        data : {
                            "loginToken": cookies.get('loginToken'),
                            "tweetId" : this.tweetId
                        }
                    }).then(() => {
                        this.getTweetLikes();

                    }).catch((error) => {
                        console.error("There was an error" +error);
                })
                }else if(this.isLike == true){
                    console.log('true');
                    axios.request({
                        url : "https://tweeterest.ml/api/tweet-likes",
                        method : "DELETE",
                        headers : {
                            'X-Api-Key' : process.env.VUE_APP_API_KEY,
                            'Content-Type': 'application/json'
                        },
                        data : {
                            "loginToken": cookies.get('loginToken'),
                            "tweetId" : this.tweetId
                        }
                    }).then(() => {
                        this.getTweetLikes();

                    }).catch((error) => {
                        console.error("There was an error" +error);
                })
                }
            },
            getTweetLikes(){
                    axios.request({
                        url : "https://tweeterest.ml/api/tweet-likes",
                        method : "GET",
                        headers : {
                            'X-Api-Key' : process.env.VUE_APP_API_KEY,
                            'Content-Type': 'application/json'
                        },
                        params : {
                            "tweetId" : this.tweetId
                        }
                    }).then((response) => {
                        this.tweetLikeCount = response.data.length
                        this.likingUsers = response.data
                        let filteredUser = this.likingUsers.filter(this.isLikedByUser)
                        if(filteredUser.length == 0){
                            this.isLike = false
                        }else{
                            this.isLike = true
                        }

                    }).catch((error) => {
                        console.error("There was an error" +error);
                })
            },
        //filtering the recieved object from above(likingUsers) to determine which like button should be rendered//
            isLikedByUser(user){
                if(this.authenticated == user.userId){
                    return true
                }else if(this.authenticated != user.userId){
                    return false
                }
            },
            //emits to FeedBody/DiscoverBody that it needs to edit itself with the changes made
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
                }).then(() => {
                    this.$emit('UpdateProfileTabBar');
                    this.$emit('UpdateDiscoverBody');

                }).catch((error) => {
                    console.error("There was an error" +error);
                })
            },
            //emits to FeedBody/DiscoverBody that it needs to edit itself with the changes made
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
                }).then(() => {
                    this.$emit('UpdateProfileTabBar');
                    this.$emit('UpdateDiscoverBody');
                    
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
                    params: {
                        "tweetId": this.tweetId
                    }
                }).then((response) => {
                    this.tweetComments = response.data;
                    this.commentCount = response.data.length


                }).catch((error) => {
                    console.error("There was an error" +error);
                })
            },
            applyComment(){
                axios.request({
                    url : "https://tweeterest.ml/api/comments",
                    method : "POST",
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        "loginToken": cookies.get('loginToken'),
                        "tweetId" : this.tweetId,
                        "content": this.tweetCom
                    }
                }).then(() => {
                    this.getComments();

                }).catch((error) => {
                    console.error("There was an error" +error);
                    console.log(error.response);
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
.v-application a{
    color: white;
    font-size: 1.3rem;
}
span{
    margin-right: 4%;
}


</style>
