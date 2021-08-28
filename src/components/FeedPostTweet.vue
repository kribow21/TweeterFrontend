<template>
    <div>
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

            <v-list-item-content>
                <v-list-item-title color="secondary">
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

        <v-card-actions id="editors">
        <v-list-item class="grow">
            <v-row
                align="center"
                justify="end"
            >
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
        <v-card-actions>
            <p>new</p>
        </v-card-actions>
    </v-card>
    </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies"
    export default {
        name : 'FeedPostTweet',
        props : {
            username : String,
            tweetImageUrl: String,
            content : String,
            createdAt: String,
            tweetId: Number,
            imageUrl: String,
            userId: Number
        },
                methods: {
            clickToEdit(){
                if (this.isForm == true){
                    this.isForm = false
                }else if(this.isForm == false){
                    this.isForm = true
                }
            },
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
            }
        },
        data() {
            return {
                isForm: true,
                editedContent: "",
            }
        }
    }
</script>

<style scoped>
.EditForm{
    display: none;
}
.v-application a{
    color: black;
}

</style>
