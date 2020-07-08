<template>
    <v-container>

      <div class="text-center pb-3">
          <span class="display-1 hidden-xs-only">SHOPPING CART</span>
          <span class="title hidden-sm-and-up">SHOPPING CART</span>
         <img src="../assets/cart.png" alt="shopping basket" id = "shopping-basket">
      </div>

      <div class="py-5 title text-center" v-if="cartLength === 0">
        {{emptyCart}}
      </div>

       <v-sheet
            color="`grey"
            class="px-3 pt-3 pb-3"
            v-if = "$store.state.isLoading"
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

       <div class="flex-products" >

        <v-card flat v-for="(product, index) in productsInCart" :key="index" width="250" class="flex-product-items">

          <div class="title py-3" v-textAlign="'center'" v-textColor="'#3787D6'">{{product.details.productName}}</div>

          <v-avatar tile width="100%" height="225">
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
                <v-btn outlined x-small @click="placeOrder(id = product._id)">Place order</v-btn>
              </div>
            </div>

          </v-card-text>

        </v-card>
      </div> 
    </v-container>
</template>

<script>
// import gsap for animations
import {gsap} from "gsap"

export default {
  data() {
    return {
      productsInCart: "",
      emptyCart: "NO ITEMS IN CART",
      orderRules: [
        v => !!v || "This field is required"
      ],
      emailRules: [
        v => !!v || "Email is required",
        v => /.+@.+\..+/.test(v) || 'E-mail must be a valid email address'
      ],
      quantityRules: [
        v => !!v || "This field is required",
        v => v > 0 || "Quantity must be greater than zero",
        // quantity should not exceed quantity in store
      ],
      orderDetails: {
        contactDetails: {
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          shippingAddress: ""
        },
        productDetails: {
          productName: "",
          productImage: "",
          quantity: "",
          price: "",
          shippingFee: "",
          totalCost: this.getTotalCost,
          delivered: false
        }
      },
    }

  },

  computed: {
    cartLength() {
      return this.productsInCart.length
    }
  },

  methods: {
     placeOrder(id) {
      this.$router.push(`/product/${id}`)
      this.$store.state.placeOrderDialog = true
    }

  },

  mounted() {

    this.productsInCart = this.$store.state.cart

    // animate shopping basket with gsap
    gsap.from("#shopping-basket", {
      duration: 5,
      x: 100,
      yoyo: true,
      ease: "bounce",
      repeat: -1,
      repeatDelay: 1,
    })
  },
  
}
</script>

<style scoped>
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
  .product-image {
    width: 100%; 
    height: 100%;
    object-fit: fit;
  }

  .loader-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .loader-container > div {
    margin: 10px;
  }

  #shopping-basket {
    width: 50px;
    object-fit: cover;
  }

  @media (max-width: 250px) {
    .flex-sub-items{
      display: block;
    }

    .flex-sub-items > div {
      margin-bottom: 10px;
    }
  }

  @media (max-width: 600px) {
    #shopping-basket {
      width: 30px;
    }
  }
</style>