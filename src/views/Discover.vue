<template>
    <div>
        <ProfileFeedDiscoverBar/>
        <DiscoverBody/>
    </div>
</template>

<script>
import DiscoverBody from '../components/DiscoverBody.vue'
import ProfileFeedDiscoverBar from '../components/ProfileFeedDiscoverBar.vue'
    export default {
        name : 'Discover',
        components: {
            DiscoverBody,
            ProfileFeedDiscoverBar
        },
    }
</script>

<style scoped>

</style>