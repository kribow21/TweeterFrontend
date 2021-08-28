<template>
    <div>
        <UserProfile/>
        <ProfileTabBar :userId="getCookie()"/>
    </div>
</template>

<script>
import cookies from "vue-cookies"
import UserProfile from '../components/UserProfile.vue'
import ProfileTabBar from '../components/ProfileTabBar.vue'
    export default {
        name : 'Profile',
        components: {
            UserProfile,
            ProfileTabBar
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