<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Tweeter Logo"
          class="shrink mr-2"
          contain
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzjMyQtDIsNe5jSvv7pd37B-Ku0sjD_UX4jQ&usqp=CAU"
          transition="scale-transition"
          width="40"
        />

      </div>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main>
        <router-link to="/">Login</router-link>
        <router-link to="/Signup">Sign Up</router-link>
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
