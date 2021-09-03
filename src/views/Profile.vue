<template>
    <div>
        <ProfileFeedDiscoverBar/>
        <UserProfile/>
        <ProfileTabBar :userId="getCookie()"/>
    </div>
</template>

<script>
import cookies from "vue-cookies"
import UserProfile from '../components/UserProfile.vue'
import ProfileTabBar from '../components/ProfileTabBar.vue'
import ProfileFeedDiscoverBar from '../components/ProfileFeedDiscoverBar.vue'
    export default {
        name : 'Profile',
        components: {
            UserProfile,
            ProfileTabBar,
            ProfileFeedDiscoverBar
        },
        methods: {
            getCookie() {
                return cookies.get('userId')
            }
        },
    }
</script>

<style scoped>

</style>