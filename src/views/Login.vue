<template>
  <div>
    <router-link to="/">Login</router-link>
    <router-link to="/signup">Sign Up</router-link>
    <LoginInput/>
  </div>
</template>

<script>
import LoginInput from '../components/LoginInput.vue'

  export default {
    name: 'Home',
    components: {
        LoginInput,
    }
  }
</script>