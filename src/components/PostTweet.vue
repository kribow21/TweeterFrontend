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
        <!-- bottom part of card, holds the buttons to edit/like tweets-->
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
                        <v-icon 
                            v-if="likeState == 'unliked'"
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
                            content=tweetLikes
                            >
                        </v-badge>
            </v-row>
            </v-list-item>
        </v-card-actions>
                <!-- actions shown on tweets that are NOT the user logged in-(authenticated)-->
        <v-card-actions v-else>
                        <v-icon 
                            v-if="likeState == 'unliked'"
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
                            content=this.tweetLikes
                            >
                        </v-badge>
        </v-card-actions>
    </v-card>
    <PostTweetComment/>
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
            imageUrl: String,
            userId: Number,
        },
        mounted () {
            // this.getComments();
            this.getTweetLikes();
        },
        data() {
            return {
                isForm: true,
                editedContent: "",
                authenticated : cookies.get('userId'),
                tweetComments: [],
                likeState: 'unliked',
                tweetLikes: ""
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
    // for changing the state of the like button//
            changeLikeState(newLikeState){
                this.likeState = newLikeState
            },
            likeButtonClick(){
                if(this.likeState == 'unliked'){
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
                    }).then((response) => {
                        console.log(response);
                        this.changeLikeState('liked');

                    }).catch((error) => {
                        console.error("There was an error" +error);
                })
                }else if(this.likeState == 'liked'){
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
                    }).then((response) => {
                        console.log(response);
                        this.changeLikeState('unliked');

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
                        // console.log(response);
                        this.tweetLikes = response.data.length
                        // console.log(this.tweetLikes);

                    }).catch((error) => {
                        console.error("There was an error" +error);
                })
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
                    console.log(response);
                    this.tweetComments = response.data;

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
.v-application a{
    color: white;
}

</style>
