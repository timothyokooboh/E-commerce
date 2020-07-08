<template>
    <div>
        <!-- top app bar -->
        <v-app-bar app flat color="#FFFFFF">

            <v-toolbar-title class = "font-weight-bold" color>
                <v-btn text class="hidden-sm-and-down">
                    <router-link to="/" class="#3787D6--text">BUY-HUB</router-link>
                </v-btn>

                <v-btn text class="hidden-md-and-up">
                    <router-link to="/" class="#3787D6--text">
                        <v-icon>mdi-home</v-icon>
                    </router-link>
                </v-btn>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-icon color = "#3787D6" @click="openSearch" v-if="!$store.state.searchBar && $route.name === 'Home' " >mdi-magnify</v-icon>

            <v-menu offset-y v-if="$route.name === 'Home' " :close-on-content-click="closeOnContentClick" transition="fab-transition">

                <template v-slot:activator="{on}">
                    <v-btn text color="#3787D6" v-on="on">
                        <span>FILTER</span>
                        <v-icon>mdi-menu-down</v-icon>
                    </v-btn>
                </template>

                <v-card>
                    <v-list>
                        <div class="px-4"> FILTER BY: </div>
                        <v-list-item class="pointer">
                            <v-menu offset-x transition="fab-transition">
                                <template v-slot:activator="{on}">
                                     <v-list-item-title v-on="on">
                                        Category
                                    </v-list-item-title>
                                </template>
                                <v-card>
                                    <v-list>
                                        <v-list-item v-for="(item, index) in $store.state.productsCategory" :key="index" @click="getByCategory(item)">
                                            <v-list-item-title class="pointer">
                                                {{item}}
                                            </v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-card>
                            </v-menu>
                        </v-list-item>

                        <v-list-item class="pointer" @click="getByFree">
                            <v-list-item-title>
                                Free Delivery
                            </v-list-item-title>
                        </v-list-item>

                        <v-list-item @click="getByPaid">
                            <v-list-item-title class="pointer">
                                Paid Delivery
                            </v-list-item-title>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-title>
                                <v-text-field 
                                    v-model="priceGreater"
                                    type="number"
                                    placeholder="Price greater than"
                                    :rules="priceRules"
                                >
                                </v-text-field>
                            </v-list-item-title>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-title>
                                <v-text-field 
                                    v-model="priceLesser"
                                    type="number"
                                    placeholder="Price less than"
                                    :rules="priceRules"
                                >
                                </v-text-field>
                            </v-list-item-title>
                        </v-list-item>

                    </v-list>
                </v-card>
            </v-menu>

            <router-link to = "/auth/user/dashboard" v-if="$store.state.isAuth"> Dashboard </router-link>

            <v-tooltip bottom color="#e14594" >

                <template v-slot:activator="{on}">
                    <v-btn text color="#3787D6" v-on="on" @click="cartRoute()">
                        <span class="mr-2 hidden-xs-only"> Cart </span>
                        <v-icon>mdi-cart</v-icon>
                    </v-btn>
                        
                </template>

                <div> View Cart </div>
                
            </v-tooltip>

            <v-btn text color = "#3787D6"  @click = "logout" v-show="$store.state.isAuth"> 
                <v-icon left>mdi-logout</v-icon>
                <span>Logout</span>
            </v-btn>
            
        </v-app-bar>

        <!--bottom app bar -->

        <v-app-bar app flat color="#FFFFFF" bottom>

             <router-link to = "/about" class="hidden-sm-and-down">
                <v-btn text color = "#3787D6"> 
                    <v-icon left>mdi-information</v-icon>
                    <span>About</span>
                </v-btn>
            </router-link>

            <v-btn text color = "#3787D6" class="hidden-sm-and-down"> 
                <v-icon left>mdi-account-circle</v-icon>
                <span><a href="https://timothyokooboh.github.io/portfolio" target="_blank">Develover</a></span>
            </v-btn>

            <a href="timothyokooboh.github.io/portfolio" target="_blank" id="portfolio"></a>

            <v-app-bar-nav-icon color="#3787D6" @click = "drawer =! drawer" class="hidden-md-and-up"> </v-app-bar-nav-icon>

             <v-toolbar-title class = "font-weight-bold" color>
                <v-btn text class="hidden-md-and-up">
                    <router-link to="/" class="#3787D6--text">BUY-HUB</router-link>
                </v-btn>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-tooltip bottom color="#e14594" >
                <template v-slot:activator="{on}">
                    <v-icon @click="changeTheme" color="#3787D6" class="mx-1" v-on="on">mdi-brightness-6</v-icon>
                </template>
                <span>Toggle light and dark mode</span>
            </v-tooltip>
            
        </v-app-bar>

        <v-navigation-drawer app disable-resize-watcher v-model = "drawer" color="#3787D6" class="hidden-md-and-up">
            <v-list>

                <v-list-item @click="logout" v-show="$store.state.isAuth">
                    <v-list-item-icon>
                        <v-icon color="#fff">mdi-logout</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="white--text">Logout</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item @click="$router.push('/auth/user/dashboard')" v-show="$store.state.isAuth">
                    <v-list-item-icon>
                        <v-icon color="#fff">mdi-view-dashboard</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="white--text">Dashboard</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item @click="$router.push('/about')">
                    <v-list-item-icon>
                        <v-icon color="#fff">mdi-information</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="white--text">About</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-icon>
                        <v-icon color="#fff">mdi-account-circle</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <a href="https://timothyokooboh.github.io/portfolio" target="_blank" class="white--text">Developer</a>
                    </v-list-item-content>
                </v-list-item>

            </v-list>
        </v-navigation-drawer>

    </div>
</template>

<script>
import ProductDataService from "../services/ProductDataService"
export default {
  name: 'Home',
  data() {
      return {
          drawer: false,
          closeOnContentClick: false,
          priceGreater: "",
          priceLesser: "",
          category:"",
          priceRules: [
              v => v > 0 || "Negative values not allowed"
          ]
      }
  },
  components: {
    
  },
  methods: {
    logout() {
        this.$store.dispatch("aLogOut")
    },
    openSearch() {
        this.$store.dispatch("aOpenSearch")
        window.scrollTo(0, 0)
    },
    changeTheme() {
        this.$store.dispatch("aThemeMode")
    },
    getByFree() {
        this.$store.state.skeletonLoader = true
        ProductDataService.getProductsByShipping("Free")
        .then((res) => {
            this.$store.state.products = res.data
            this.$store.state.skeletonLoader = false
        })
        .catch((err) => {
            console.log(err)
            this.$store.state.skeletonLoader = false
        })
    },
    getByPaid() {
        this.$store.state.skeletonLoader = true
        ProductDataService.getProductsByShipping("Paid")
        .then((res) => {
            this.$store.state.products = res.data
            this.$store.state.skeletonLoader = false
        })
        .catch((err) => {
            console.log(err)
            this.$store.state.skeletonLoader = false
        })
    },
    getByPriceGreaterThan() {
        this.$store.state.skeletonLoader = true
        ProductDataService.getProductsByPriceGreaterThan(this.priceGreater)
        .then((res) => {
            this.$store.state.products = res.data
             this.$store.state.skeletonLoader = false
        })
        .catch((err) => {
            console.log(err)
            this.$store.state.skeletonLoader = false
        })
    },
    getByPriceLessThan() {
        this.$store.state.skeletonLoader = true
        ProductDataService.getProductsByPriceLessThan(this.priceLesser)
        .then((res) => {
            this.$store.state.products = res.data
            this.$store.state.skeletonLoader = false
        })
        .catch((err) => {
            console.log(err)
            this.$store.state.skeletonLoader = false
        })
    },

    getByCategory(item) {
        this.$store.state.skeletonLoader = true
        ProductDataService.getProductsByCategory(item)
        .then((res) => {
            this.$store.state.products = res.data
            this.$store.state.skeletonLoader = false
        })
        .catch((err) => {
            console.log(err)
            this.$store.state.skeletonLoader = false
        })
    },

    cartRoute() {
        this.$router.push("/products/cart", () => {
            // on complete, refresh the cart page to display the updated cart
            this.$router.go(0)
        })

    }

  },
  
  watch: {
    priceGreater() {
        if(this.priceGreater > 0)
        setTimeout(this.getByPriceGreaterThan(), 3000)
    },
    priceLesser() {
        if(this.priceLesser > 0)
        setTimeout(this.getByPriceLessThan(), 3000)
    }
  },

}
</script>

<style scoped>
    a {
        text-decoration: none;
    }
    .pointer {
        cursor: pointer;
    }
</style>