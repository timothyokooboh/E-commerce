<template>
  <!-- Since Vuetify is installed, the entire content of the application must be wrapped inside the v-app compoenent. -->
  <v-app>
    <!-- Use the Navigation component so that it appears across all pages -->
    <Navigation />

    <!-- Since vuetify is installed, our routes will work by simply wrapping the router-view component inside the v-main component -->

    <v-main> 
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Navigation from "./components/Navigation"

export default Vue.extend({
  name: 'App',

  components: {
    Navigation
  },

  data: () => ({
    //
  }),

   created() {
    this.$store.dispatch('aAutoLogin')

    // if(this.$store.state.userToken !== "") {
    //   this.$store.state.isAuth = true
    // }
  
  }
});
</script>

<style> 

  :root {
    --primary-color: #160f30;
    --secondary-color: #241663;
    --tertiary-color: #a72693;
    --flavored-color: #eae7af;
  }
  body::-webkit-scrollbar {
    overflow-y: scroll;
    display: none;

  }
  body {
    -ms-overflow-style: none;
  }
  
</style>
