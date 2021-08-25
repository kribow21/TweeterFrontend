<template>
  <LoginContainer/>
</template>

<script>
  import LoginContainer from '../components/LoginContainer'
// import cookies from "vue-cookies"

  export default {
    name: 'Home',
    components: {
      LoginContainer,
    },
    methods: {
      // validate() {
      //   if (cookies.get('loginToken') == 'undefined'){
          
      //   }
      // }
      
    },
  }
</script>
beforeRouteLeave(to, from, next){
  if (to.Feed !== !isAuthenticated from.Login) 
  else next(false)
}