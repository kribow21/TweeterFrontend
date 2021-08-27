<template>
    <div>
        <v-card
    class="mx-auto"
    color="primary"
    dark
    max-width="100%"
  >
    <v-card-title>
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

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            alt=""
            src="imageUrl"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{username}}</v-list-item-title>
        </v-list-item-content>

        <v-row
          align="center"
          justify="end"
        >
          <v-icon class="mr-1">
            mdi-heart
          </v-icon>
          <span class="subheading mr-2">256</span>
          <span class="mr-1">·</span>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
    </div>
</template>

<script>
    export default {
        name : 'TweetBody',
        props : {
            username : String,
            tweetImageUrl: String,
            content : String,
            createdAt: String,
            tweetId: Number,
            imageUrl: String
        }
    }
</script>

<style scoped>

</style>