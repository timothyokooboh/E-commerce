<template>
   <div>

       <v-snackbar top v-model = "snackbar" :timeout="8000">
           Delivery status has been updated
       </v-snackbar>

        <v-dialog v-model = "dialog">

            <template v-slot:activator="{on}">
                <div class="dialogBtn">
                    <div>
                        <v-btn v-on="on" @click="dialog =! dialog">
                            <v-icon left medium>mdi-pencil</v-icon>
                            <span>Update delivery status</span>
                        </v-btn>
                    </div>
                </div>
            </template>
               
            <v-card>
                 
                <v-form class="mx-5 py-5" ref = "form">

                    <h1 class="py-5">UPDATE DELIVERY STATUS</h1>

                    <h3  class="py-3">Product Details</h3>

                    <v-select
                        :items = "items"
                        label = "Delivered"
                        prepend-icon="mdi-train-car"
                        :rules = "deliveredRules"
                        v-model = "delivered"
                    >
                    </v-select>

                    <v-text-field 
                        :value="order.productDetails.productName"
                        label = "Product name"
                        :disabled = true
                    >
                    </v-text-field>

                    <v-text-field 
                        :value="order.productDetails.quantity"
                        label = "Quantity"
                        :disabled = true
                    >
                    </v-text-field>

                    <v-text-field 
                        :value="order.productDetails.totalCost"
                        label = "Total cost"
                        :disabled = true
                    >
                    </v-text-field>

                    <h3 class="py-3">Buyer Details</h3>

                    <v-text-field 
                        :value="order.contactDetails.firstName"
                        label = "First Name"
                        :disabled = true
                    >
                    </v-text-field>

                    <v-text-field 
                        :value="order.contactDetails.lastName"
                        label = "Last Name"
                        :disabled = true
                    >
                    </v-text-field>

                    <v-text-field 
                        :value="order.contactDetails.phone"
                        label = "Phone"
                        :disabled = true
                    >
                    </v-text-field>

                    <v-text-field 
                        :value="order.contactDetails.email"
                        label = "Email"
                        :disabled = true
                    >
                    </v-text-field>

                    <v-text-field 
                        :value="order.contactDetails.shippingAddress"
                        label = "Shipping address"
                        :disabled = true
                    >
                    </v-text-field>

                    <v-btn 
                        :loading="loadingContent" 
                        width = "100%" color="#a72693" 
                        class = "my-5 white--text" 
                        @click = "updateStatus"
                    >
                        Update Status
                    </v-btn>

                </v-form>
            </v-card>
        </v-dialog>
  
   </div>
</template>

<script>
import OrderDataService from "../services/OrderDataService"
export default {
    data() {
        return {
            order: "",
            delivered: "",
            items: ["true", "false"],
            snackbar: false,
            dialog: true,
            loadingContent: false,
            deliveredRules: [
                v => !!v || "Delivery status is required"
            ]
        }
    },

    methods: {
        updateStatus() {
            if (this.$refs.form.validate()) {
                this.loadingContent = true

                OrderDataService.update(this.$route.params.id, {
                   contactDetails: {
                       firstName: this.order.contactDetails.firstName,
                       lastName: this.order.contactDetails.lastName,
                       phone: this.order.contactDetails.phone,
                       email: this.order.contactDetails.email,
                       shippingAddress: this.order.contactDetails.shippingAddress,
                   },
                   productDetails: {
                       productName: this.order.productDetails.productName,
                       productImage: this.order.productDetails.productImage,
                       price: this.order.productDetails.price,
                       shippingFee: this.order.productDetails.shippingFee,
                       quantity: this.order.productDetails.quantity,
                       totalCost: this.order.productDetails.totalCost,
                       delivered: this.delivered
                   }
                })
                .then((res) => {
                    console.log(res.data)
                    this.snackbar = true
                    this.loadingContent = false
                })
                .catch((err) => {
                    console.log(err)
                    this.loadingContent = false
                })
            }
        }
    },

    mounted() {
        OrderDataService.show(this.$route.params.id)
        .then((res) => {
            this.order = res.data
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }
}
</script>

<style scoped>
    .dialogBtn {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }
</style>