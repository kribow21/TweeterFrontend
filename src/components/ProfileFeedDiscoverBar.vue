<template>
    <div>
            <v-app-bar
        app
        color="secondary"
        dark
        height='70px'
    >
    <div class="d-flex align-center">
        <v-img
            alt="Tweeter Logo"
            class="shrink mr-2"
            contain
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzjMyQtDIsNe5jSvv7pd37B-Ku0sjD_UX4jQ&usqp=CAU"
            transition="scale-transition"
            width="50"
        />
        <router-link to="/feed">Home Feed</router-link>
        <router-link to="/discover">Discover</router-link>
        <router-link to="/profile">Profile</router-link>

    </div>

    <v-spacer></v-spacer>
        <v-btn
            @click="logoutUser"
            color="primary"
            elevation="2"
            raised
            >Log Out
        </v-btn>

    </v-app-bar>
    </div>
</template>

<script>
import cookies from "vue-cookies"
    export default {
        name : 'ProfileFeedDiscoverBar',
        methods: {
            logoutUser() {
                cookies.remove('loginToken');
                cookies.remove('userId')
                this.$router.push('/');
            }
        },
    }
</script>

<style scoped>

</style>