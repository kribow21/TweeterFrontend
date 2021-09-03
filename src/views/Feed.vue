<template>
    <div>
        <ProfileFeedDiscoverBar/>
        <FeedBody/>
    </div>
</template>

<script>
import FeedBody from '../components/FeedBody.vue'
import ProfileFeedDiscoverBar from '../components/ProfileFeedDiscoverBar.vue'
    export default {
        name : 'Feed',
        components: {
            FeedBody,
            ProfileFeedDiscoverBar,
        },
    }
</script>

<style scoped>

</style>