<template>
    <div>
            <v-expansion-panels>
            <v-expansion-panel>
            <v-expansion-panel-header>
                        <v-icon color="accent">
                            Comments
                        </v-icon>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <h4>{{username}}</h4>
                <h6>{{createdAt}}</h6>
                <p>{{content}}</p>
            </v-expansion-panel-content>
                    <!-- panel shown on comments that ARE the user logged in -->
            <v-expansion-panel-content
            v-if="this.authenticated == this.userId">
                    <v-icon class="mr-1"
                        @click="deleteComment"
                        color="accent">
                        mdi-comment-remove-outline
                    </v-icon>
                <v-icon class="mr-1"
                @click="clickToComment"
                color="accent">
                mdi-comment-edit-outline
                </v-icon>
                        <div :class="{EditComment : isCommentEdit}">
                        <v-col
                            cols="12"
                            sm="10"
                        >
                        <v-text-field
                            label="edited comment"
                            v-model="editedComment"
                            outlined
                        ></v-text-field>
                        <v-btn
                                @click="editComment"
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
                            :content="0"
                            >
                        </v-badge>
            </v-expansion-panel-content>
                        <v-expansion-panel-content v-else>
                    <!-- panel shown on comments that are NOT the user logged in -->
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
                            :content="0"
                            >
                        </v-badge>
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
                editedComment: "",
                isCommentEdit: true,
                authenticated : cookies.get('userId'),
                tweetComments: [],
                isLike: false,
                tweetLikeCount: "",
                likingUsers: [],
            }
        },
        methods: {
            clickToComment(){
                if (this.isCommentEdit == true){
                    this.isCommentEdit = false
                }else if(this.isCommentEdit == false){
                    this.isCommentEdit = true
                }
            },
            editComment() {
                axios.request({
                    url : "https://tweeterest.ml/api/comments",
                    method : "PATCH",
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        "loginToken" : cookies.get('loginToken'),
                        "commentId": this.commentId,
                        "content": this.editedComment
                    }
                }).then((response) => {
                    console.log(response);
                    this.$emit('UpdatePostTweet');

                }).catch((error) => {
                    console.error("There was an error" +error);
                })
            },
            deleteComment(){
                axios.request({
                    url : "https://tweeterest.ml/api/comments",
                    method : "Delete",
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        "loginToken" : cookies.get('loginToken'),
                        "commentId": this.commentId,
                    }
                }).then((response) => {
                    console.log(response); 
                    this.$emit('UpdatePostTweet');
                    
                }).catch((error) => {
                    console.error("There was an error" +error);
                })
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
                    }).then((response) => {
                        console.log(response);
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
                    }).then((response) => {
                        console.log(response);
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
                        // console.log(response);
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
        }
    }
</script>

<style scoped>
.EditComment{
    display: none;
}
</style>