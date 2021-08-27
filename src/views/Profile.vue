<template>
    <div>
        <UserProfile/>
        <ProfileTabBar/>
    </div>
</template>

<script>
import UserProfile from '../components/UserProfile.vue'
import ProfileTabBar from '../components/ProfileTabBar.vue'
    export default {
        name : 'Profile',
        components: {
            UserProfile,
            ProfileTabBar
        },
    }
</script>

<style scoped>

</style>