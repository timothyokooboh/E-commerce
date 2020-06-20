<template>
    <div>
        <v-app-bar app flat color="#241663" class="white--text">

            <v-app-bar-nav-icon color="#fff" @click = "drawer =! drawer"> </v-app-bar-nav-icon>

            <v-toolbar-title class = "font-weight-bold" color>
                <v-btn text color="#fff">
                    BUY-hub
                </v-btn>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-tooltip bottom color="#e14594">
                <template v-slot:activator="{on}">
                    <v-btn text color="#fff" v-on="on">
                        <span class="mx-3"> Cart </span>
                    <v-icon>mdi-cart</v-icon>
                    </v-btn>
                </template>
                <div> View Cart </div>
            </v-tooltip>
            
        </v-app-bar>

        <v-navigation-drawer app disable-resize-watcher v-model = "drawer" color="#241663"></v-navigation-drawer>
    </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
      return {
          drawer: false
      }
  },
  components: {
    
  }
}
</script>