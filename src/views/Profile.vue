<template>
    <div>
        <UserProfile/>
        <ProfileEditComp/>
    </div>
</template>

<script>
import UserProfile from '../components/UserProfile.vue'
import ProfileEditComp from '../components/ProfileEditComp.vue'
    export default {
        name : 'Profile',
        components: {
            UserProfile,
            ProfileEditComp
        },
    }
</script>

<style scoped>

</style>