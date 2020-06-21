<template>
    <div>
        <v-app-bar app flat color="#241663" class="white--text">

            <v-app-bar-nav-icon color="#fff" @click = "drawer =! drawer"> </v-app-bar-nav-icon>

            <v-toolbar-title class = "font-weight-bold" color>
                <v-btn text >
                    <router-link to="/" class="white--text">BUY-HUB</router-link>
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

            <v-btn text color = "#fff"  @click = "logout" v-show="$store.state.isAuth"> 
                <v-icon left>mdi-logout</v-icon>
                <span>Logout</span>
            </v-btn>
            
        </v-app-bar>

        <v-navigation-drawer app disable-resize-watcher v-model = "drawer" color="#241663">
            <v-list>
                <v-list-item @click="logout" v-show="$store.state.isAuth">
                    <v-list-item-icon>
                        <v-icon color="#fff">mdi-logout</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="white--text">Logout</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
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
    
  },
  methods: {
      logout() {
          this.$store.dispatch("aLogOut")
      }
  }
}
</script>

<style scoped>
    a {
        text-decoration: none;
    }
</style>