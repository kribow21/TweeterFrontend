<template>
  <v-app>
    <LoginSignupBar/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import LoginSignupBar from './components/LoginSignupBar.vue';

export default {
  components: { LoginSignupBar },
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
<style scoped>
a{
  padding: 10px;
  text-decoration: none;
}
</style>
