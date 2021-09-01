<template>
  <v-app>
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
        <router-link to="/">Login</router-link>
        <router-link to="/signup">Sign Up</router-link>
        <router-link to="/feed">Home Feed</router-link>
        <router-link to="/profile">Profile</router-link>


      </div>

      <v-spacer></v-spacer>

    </v-app-bar>
  
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
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
