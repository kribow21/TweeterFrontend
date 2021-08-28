<template>
    <div>
        <OtherUserProfile :userId="this.$route.params.userId"/>
        <ProfileTabBar :userId="this.$route.params.userId"/>

    </div>
</template>

// <script>
import ProfileTabBar from '../components/ProfileTabBar.vue'
import cookies from "vue-cookies"
import OtherUserProfile from '../components/OtherUserProfile.vue';
    export default {
        name : 'OthersProfile',
        components: {
            ProfileTabBar,
            OtherUserProfile
        },
        mounted () {
            if(this.$route.params.userId == cookies.get('userId')){
                    this.$router.push('../Profile');
            }
        },
    }
</script>

<style scoped>

</style>