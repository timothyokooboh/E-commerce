<template>
    <v-container>
       <div class="flex-products" >
        <v-card v-for="(product, index) in $store.state.cart" :key="index" width="235" class="flex-product-items">
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
                <v-btn outlined x-small @click="$router.push(`/product/${product._id}`)">See datails</v-btn>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div> 
    </v-container>
</template>

<script>
export default {
  
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
</style>