<template>
    <div>
        <v-card>
            <v-container>
        <v-row dense>
            <v-col cols="12">
            <v-card
                color="accent"
                dark
            >
                <v-card-title class="text-h5">
                {{username}}
                <v-list-item-avatar>
                <img
                class="elevation-6"
                alt="user"
                :src="imageUrl"
                >
                </v-list-item-avatar>
                </v-card-title>
                    <v-card-text class="text-h6">
                    {{bio}}
                    </v-card-text>
            </v-card>
        </v-col> 
        </v-row>
        </v-container>  
        </v-card>
    </div>
</template>

<script>
    export default {
        name : 'ProfileTabFollowers',
        props: {
            username : String,
            tweetId: Number,
            imageUrl: String,
            userId: Number,
            bio: String
        },
    }
</script>

<style scoped>

</style>