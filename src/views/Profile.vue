<template>
    <div>
        <UserProfile/>
        <ProfileEditComp/>
        <ProfileDeleteComp/>
        <ProfileTabBar/>
    </div>
</template>

<script>
import UserProfile from '../components/UserProfile.vue'
import ProfileEditComp from '../components/ProfileEditComp.vue'
import ProfileDeleteComp from '../components/ProfileDeleteComp.vue'
import ProfileTabBar from '../components/ProfileTabBar.vue'
    export default {
        name : 'Profile',
        components: {
            UserProfile,
            ProfileEditComp,
            ProfileDeleteComp,
            ProfileTabBar
        },
    }
</script>

<style scoped>

</style>