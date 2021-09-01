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
    export default {
        name : 'PostTweetComment',
        props: {
            commentId: Number,
            content: String,
            createdAt: String,
            tweetId: Number,
            userId: Number,
            username: String
        }
    }
</script>

<style scoped>

</style>