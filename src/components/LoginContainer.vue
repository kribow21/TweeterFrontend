<template>
    <div>
        <router-link to="/">Login</router-link>
        <router-link to="/signup">Sign Up</router-link>
        <LoginInput/>
                
    </div>
</template>

<script>
import LoginInput from './LoginInput.vue'
    export default {
        name : 'LoginContainer',
        components : {
            LoginInput,
        }
    }
</script>

<style scoped>

</style>