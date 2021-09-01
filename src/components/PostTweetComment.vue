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
                <h4>Username</h4>
                <h6>Time Stamp</h6>
                <p>Comment content</p>
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
    export default {
        name : 'PostTweetComment',
        props: {
            commentId: Number,
            content: String,
            createdAt: String,
            tweetId: Number,
            userId: String,
            username: String
        },
        data() {
            return {
                commentInput: ""
            }
        },
    }
</script>

<style scoped>

</style>