<template>
  <div class="home">
      <!-- <div v-if="$store.state.skeletonLoader">
        <div v-for="(item, index) in loader" :key="index" class="skeleton-5nwvrf10w4o heightForSkeleton-5nwvrf10w4o"></div>
      </div>-->

      <div id = "hello">
        hello there
      </div>

      <div class = "flex-container">
        <div class="input-container mx-5 my-5" v-if="$store.state.searchBar">
          <div>
            <v-icon color="#f4c3a9" @click="removeSearchBar">mdi-arrow-left</v-icon>
          </div>
          <div class="input">
            <input type="text" placeholder="Search For Products" v-model="$store.state.searchTerm">
          </div>
          <div>
            <v-btn rounded small class="search-btn white--text" color="#241663" @click="fetchProducts">Search</v-btn>
          </div>
        </div>
      </div>

      <div class="flex-products" >
        <v-card v-for="(product, index) in $store.state.products" :key="index" class="flex-product-items" width = "225">
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
              <div>quantity: {{product.details.quantity}}</div>
            </div>
            <div  class="flex-sub-items">
              <div> Delivery: <span class="text-uppercase"> {{product.delivery.shipping}}</span> </div>
              <div>
                <v-btn outlined x-small @click="$router.push(`/product/${product._id}`)">See datails</v-btn>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>
    
  </div>
</template>

<script>

import {gsap} from "gsap"

export default {
  name: 'Home',
  data() {
    return {
      loader: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },
  methods: {
    removeSearchBar() {
      this.$store.state.searchBar = false
    },
    fetchProducts() {
      this.$store.dispatch('aFetchProducts')
    },
   
  },

  mounted() {
    this.$store.dispatch('aFetchProducts')

    // const cards = document.getElementsByClassName("flex-product-items")

    // cards.forEach((card) => {
    //   card.addEventListener("mouseover", () => {

    //   const tl = gsap.timeline({onComplete: function(){
    //     tl.pause(0)
    //   }})

    //   tl.to(card, {
    //     boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.9)"
    //   })


    //   })
    // })

    
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
    color: var(--tertiary-color);
    font-weight: bold;
    border: 1px solid #3787D6;
  }
  .search-btn {
    margin-left: -80px;
    margin-top: 4px;
  }
  .remove-search {
    margin-right: -80px;
    margin-top: 4px;
  }
  .hide-search {
    display: none;
  }
  .flex-products {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  .flex-products .flex-product-items {
    margin: 10px 10px;
  }
  .flex-sub-items {
    display: flex;
    justify-content: space-between;
  }
  .loader-container {
    display: flex;
  }
  .product-image {
    width: 100%; 
    height: 100%;
  }

  .flex-product-items:hover {
    box-shadow: 10px 7px 17px 2px rgba(0,0,0,0.22)
  }

  .skeleton-5nwvrf10w4o:empty {background-color: #FFFFFF;}
  .skeleton-5nwvrf10w4o:empty.heightForSkeleton-5nwvrf10w4o {height: 274px;}
  .skeleton-5nwvrf10w4o:empty {
    background-image: linear-gradient( 100deg, rgba(255, 255, 255, 0), 
    rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 80% ),
    linear-gradient( #E0E0E0 20px, transparent 0 ),
    radial-gradient( circle 15.5px at 15.5px 15.5px, #E0E0E0 14.5px, transparent 15.5px ),
    linear-gradient( #E0E0E0 189px, transparent 0 );
    background-size: 50px 275px,143px 275px,31px 275px,190px 275px;
    background-position: 0 0,70px 229px,20px 222px,22px 25px;
    animation: shineForSkeleton-5nwvrf10w4o 2s infinite;}
  @keyframes shineForSkeleton-5nwvrf10w4o {to {background-position: 100% 0,70px 229px,20px 222px,22px 25px;}}
</style>
