<template>
  <div class="home">

    <v-sheet
      color="`grey lighten-4"
      class="px-3 pt-3 pb-3"
      v-if="$store.state.isLoading"
    >

      <div class="loader-container">

        <div v-for = "n in 5" :key="n">
          <v-skeleton-loader
            class="mx-auto"
            type="card-avatar"
            width = "200"
          >
          </v-skeleton-loader>
        </div>
        
      </div>
      
    </v-sheet>

    <v-snackbar top :timeout = "6000" v-model = "deleteSnackbar" >
      Item deleted sucessfully
    </v-snackbar>

    <v-snackbar top :timeout = "6000" v-model = "$store.state.errorSnackbar" >
      Something went wrong. Try refreshing the page.
    </v-snackbar>

    <div v-if="$store.state.searchStatus" class="display-1 text-center">
      NO RESULT FOUND
    </div>

    <div class = "flex-container">
      <div class="input-container mx-5 my-5" v-if="$store.state.searchBar">
        <div>
          <v-icon color="#f4c3a9" @click="removeSearchBar">mdi-arrow-left</v-icon>
        </div>
        <div class="input">
          <input type="text" placeholder="Search For Products" v-model="$store.state.searchTerm">
        </div>
      </div>
    </div>

      <div class="flex-products" >

        <v-card shaped flat v-for="(product, index) in getProducts" :key="index" class="flex-product-items" width = "235">

          <div @click="$router.push(`/product/${product._id}`); $store.state.placeOrderDialog = false " style = "cursor: pointer">

            <div class="title py-3" v-textAlign="'center'" v-textColor="'#3787D6'">{{product.details.productName}}</div>

            <v-avatar tile width="100%" height="100%">
              <img :src="product.details.imageSrc" class="product-image">
            </v-avatar>

            <v-divider></v-divider>

            <v-card-text>

              <div class="flex-sub-items mb-2">

                <div>
                  <v-icon small> mdi-currency-ngn </v-icon>
                  <span> {{product.details.price}} </span>
                </div>

                <div>Quantity: {{product.details.quantity}}</div>

              </div>

              <div  class="flex-sub-items">
                <div class="mt-3"> Delivery: <span class="text-uppercase"> {{product.delivery.shipping}}</span> </div>
              </div>

            </v-card-text>
          </div>

        </v-card>
        
      </div>
    
  </div>
</template>

<script>

import ProductDataService from '../services/ProductDataService'

export default {
  name: 'Home',

  data() {
    return {
      deleteSnackbar: false,
      searchResult: false,

    }
  },

  computed:{
    getProducts() {
      // shuffle products
      const products = [...this.$store.state.products]
      return products.sort(function(a, b) {
        return 0.5 - Math.random()
      })
    },

    searchTerm() {
      return this.$store.state.searchTerm
    }
  },

  watch: {
    searchTerm() {
      this.$store.dispatch('aFetchProducts')
      this.$store.state.isLoading = false
    }
  },

  methods: {
    removeSearchBar() {
      this.$store.state.searchBar = false
    },
    fetchProducts() {
      this.$store.dispatch('aFetchProducts')
    }
   
  },
  
  mounted() {
    this.$store.dispatch('aFetchProducts')

  }

}
</script>

<style scoped>
  .flex-container {
    width: 100%;
    display: flex;
    align-items: baseline;
  }

  .input-container {
    display: flex;
    width: 90%;
  }

  .input {
    width: 100%;
  }

  .input-container input {
    width: 100%;
    background: #fff;
    height: 35px;
    border-radius: 20px;
    outline: none;
    padding: 10px;
    color: #3787D6;
    font-weight: bold;
    border: 1px solid #3787D6;
  }

  .remove-search {
    margin-right: -80px;
    margin-top: 4px;
  }

  .hide-search {
    display: none;
  }

  .flex-products {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .flex-products .flex-product-items {
    margin: 10px 10px;
  }

  .flex-sub-items {
    display: flex;
    justify-content: space-between;
  }

  .product-image {
    width: 100%; 
    height: 100%;
  }

  .flex-product-items:hover {
    box-shadow: 10px 7px 17px 2px rgba(0,0,0,0.22)
  }

  .loader-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .loader-container > div {
    margin: 10px;
  }

  
</style>
