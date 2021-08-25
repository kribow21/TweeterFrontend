<template>
    <div>
        <UserProfile/>
        <ProfileEditComp/>
        <ProfileDeleteComp/>
    </div>
</template>

<script>
import UserProfile from '../components/UserProfile.vue'
import ProfileEditComp from '../components/ProfileEditComp.vue'
import ProfileDeleteComp from '../components/ProfileDeleteComp.vue'
    export default {
        name : 'Profile',
        components: {
            UserProfile,
            ProfileEditComp,
            ProfileDeleteComp
        },
    }
</script>

<style scoped>

</style>