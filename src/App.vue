<template>
  <v-app>

    <Navigation />

    <v-main>
      <router-view />
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
