<template>
    <div>

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

        <v-snackbar v-model="$store.state.cartSnackbar" top :timeout="4000" width="100%">
            Item added to cart
        </v-snackbar>

        <v-snackbar v-model="snackbar" top :timeout="8000" width="100%">
            Thank you for your patronage. Your order was successful and is being prepared for delivery.
        </v-snackbar>

        <v-snackbar v-model="reviewSnackbar" top :timeout="8000" width="100%">
            Your review has been submitted
        </v-snackbar>

        <v-snackbar v-model="updateSnackbar" top :timeout="8000" width="100%">
            Product has been updated successfully
        </v-snackbar>

        <v-snackbar v-model="errorSnackbar" top :timeout="8000" width="100%">
            Please try again. Something went wrong.
        </v-snackbar>


        <div class="product-grid-container ma-5">

            <div>
                <div>
                    <img :src="product.details.imageSrc" class="product-image" id="image">
                </div>
                
                <div  class="flex-sub-items mt-5" v-if = "$store.state.isAuth" >

                     <v-dialog v-model = "updateDialog"> 
                        <template v-slot:activator="{on}">
                            <v-icon v-on="on" @click = "updateDialog =! updateDialog" :color="buttonColor">mdi-pencil</v-icon>
                        </template>

                        <v-card>
                            <h3 class="px-5 py-2">UPDATE PRODUCT</h3>
                            <v-form ref="updateForm" class="ma-5 py-3">
                                <v-text-field
                                    v-model="updateProductName"
                                    label = "Product name"
                                    :rules="storeRules"
                                >
                                </v-text-field>
                                <v-text-field
                                    v-model="updateProductPrice"
                                    label = "Price"
                                    :rules="storeNumberRules"
                                    prepend-icon="mdi-currency-ngn"
                                >
                                </v-text-field>
                                <v-text-field
                                    v-model="updateQuantity"
                                    label = "Quantity"
                                    :rules="storeNumberRules"
                                >
                                </v-text-field>
                                <v-text-field
                                    v-model="updateProductCategory"
                                    label = "Category"
                                    :rules="storeRules"
                                >
                                </v-text-field>
                                <v-text-field
                                    v-model="updateProductDescription"
                                    label = "Description"
                                    :rules="storeRules"
                                >
                                </v-text-field>
                                <v-select
                                    label="Select Delivery Mode"
                                    v-model="updateProductShipping"
                                    :items="updateItems"
                                    :rules="storeRules"
                                 >
                                </v-select>

                                <v-text-field
                                    label="Delivery Fee"
                                    v-model="updateProductShippingFee"
                                    type="number"
                                    v-if="updateProductShipping !== 'Free' "
                                    prepend-icon="mdi-currency-ngn"
                                    :rules="storeNumberRules"
                                >
                                </v-text-field>

                                <v-file-input 
                                    label="Upload product image"
                                    type="file"
                                    @change="handleFileUpload"
                                    ref="file"
                                    id="file"
                                >
                                </v-file-input>

                                <v-btn @click="update" width = "100%" color="#a72693" class = "my-5 white--text" :loading = "loadingContent"> Update Product </v-btn>

                            </v-form>
                        </v-card>

                     </v-dialog>

                    <div @click = "deleteItem" >
                        <v-icon style = "cursor: pointer" :color="buttonColor" >mdi-trash-can-outline</v-icon>
                    </div>

                </div>
            </div>
                

            <div>

                <div class="py-5">{{product.details.description}}</div>

                <div v-if = "getAverageReviews !== 0">
                    <span v-for="n in roundUpReviews" :key="n">
                        <v-icon small v-textColor="'#FA4748'">mdi-star</v-icon>
                    </span>
                    <span class="body-2 px-2"> {{getAverageReviews}} </span>
                </div>

                <div class="py-3 title font-weight-bold">Price: <v-icon :color="buttonColor" >mdi-currency-ngn</v-icon> {{product.details.price}}</div>
                <div class="py-3 font-weight-bold">Shipping fee: <v-icon small :color="buttonColor" >mdi-currency-ngn</v-icon> {{product.delivery.shippingFee}}</div>
                <div class="py-3 font-weight-bold">Available quantity: {{product.details.quantity}}</div>

                <div class="flex-actions my-5 mr-2">

                    <div>
                        <v-dialog v-model="dialog">

                            <template v-slot:activator="{on}">
                                <v-btn color="#3787D6" class="white--text" v-on="on" @click="dialog =! dialog">
                                    <v-icon left :color="buttonColor">mdi-cash</v-icon>
                                    <span>Place order</span>
                                </v-btn>
                            </template>

                            <v-card>
                                <v-form ref="form" class="mx-5 my-5">
                                    <div class="py-3 text-center body-2"> 
                                        <v-icon class="mx-2">mdi-hand-pointing-right</v-icon>
                                        <span>YOU PAY ON DELIVERY</span>
                                    </div>
                                    <div class="title text-center py-2">PLEASE PROVIDE YOUR CONTACT DETAILS</div>
                                    <v-text-field
                                        label="First Name"
                                        append-icon="mdi-account-outline"
                                        type="text"
                                        v-model="orderDetails.contactDetails.firstName"
                                        :rules = "orderRules"
                                    >
                                    </v-text-field>
                                    <v-text-field
                                        label="Last Name"
                                        append-icon="mdi-account-outline"
                                        type="text"
                                        v-model="orderDetails.contactDetails.lastName"
                                        :rules = "orderRules"
                                    >
                                    </v-text-field>
                                    <v-text-field
                                        label="Phone Number"
                                        append-icon="mdi-phone"
                                        type="number"
                                        v-model="orderDetails.contactDetails.phone"
                                        :rules = "orderRules"
                                    >
                                    </v-text-field>
                                    <v-text-field
                                        label="Email Address"
                                        append-icon="mdi-email"
                                        type="email"
                                        v-model="orderDetails.contactDetails.email"
                                        :rules = "emailRules"
                                    >
                                    </v-text-field>
                                    <v-text-field
                                        label="Shipping Address"
                                        append-icon="mdi-map-marker"
                                        type="text"
                                        v-model="orderDetails.contactDetails.shippingAddress"
                                        :rules = "orderRules"
                                    >
                                    </v-text-field>

                                     <div class="title text-center py-2">PRODUCT DETAILS</div>

                                    <v-text-field
                                        label = "Product Name"
                                        type = "text"
                                        :value = "product.details.productName"
                                        :disabled = "true"
                                        id="productName"
                                        
                                    >
                                    </v-text-field>

                                    <v-text-field
                                        label = "Choose Quantity"
                                        type = "number"
                                        v-model = "orderDetails.productDetails.quantity"
                                        :rules = "quantityRules"
                                    >
                                    </v-text-field>

                                    <!-- prevent the user from changing the price -->
                                    <v-text-field
                                        label = "Unit Price"
                                        :disabled = "true"
                                        :value = "product.details.price"
                                        prepend-icon = "mdi-currency-ngn"
                                    >
                                    </v-text-field>

                                    <v-text-field
                                        label = "Shipping Fee"
                                        :disabled = "true"
                                        :value = "product.delivery.shippingFee"
                                        prepend-icon = "mdi-currency-ngn"
                                    >
                                    </v-text-field>

                                    <v-text-field
                                        label = "Total Cost"
                                        :disabled = "true"
                                        prepend-icon = "mdi-currency-ngn"
                                        :value = "getTotalCost"
                                    >
                                    </v-text-field>

                                    <v-btn color="#a72693" class = "my-5 white--text" width = "100%" :loading = "loadingContent" @click = "placeOrder">SUBMIT</v-btn>
                                </v-form>
                            </v-card>

                        </v-dialog>
                    </div>

                    <div>
                        <v-btn outlined :color="buttonColor" @click="addToCart">
                            <v-icon left>mdi-cart</v-icon>
                            <span>Add to cart</span>
                        </v-btn>
                    </div>
                </div>

                <div class = "mt-5">
                    
                    <span class="font-weight-bold body-2"> USED THIS PRODUCT? </span>

                    <v-dialog v-model="reviewDialog">

                        <template v-slot:activator="{on}">

                            <v-btn text v-on="on" @click="reviewDialog =! reviewDialog" :color="buttonColor">
                                <v-icon left>mdi-pencil</v-icon>
                                <span class="font-weight-bold" v-on="on" @click="reviewDialog =! reviewDialog"> Add a review </span>
                           </v-btn>

                        </template>

                        <v-card>

                            <v-form ref = "reviewForm" class="mx-5">

                                <h2 class="py-3">Submit a review for this product</h2>

                                <v-text-field
                                    label = "Your name"
                                    append-icon="mdi-account-outline"
                                    :color="buttonColor"
                                    v-model = "reviewerName"
                                    :rules = "reviewRules"
                                >
                                </v-text-field>

                                <v-text-field
                                    label = "Your location (optional)"
                                    append-icon="mdi-map-marker"
                                    v-model = "reviewerLocation"
                                    :color="buttonColor"
                                >
                                </v-text-field>
                                
                                <v-select
                                    label = "Give a star rating"
                                    :items = "starRatings"
                                    v-model = "reviewerRating"
                                    append-icon = "mdi-star"
                                    :rules = "reviewRules"
                                >
                                </v-select>

                                <v-text-field
                                    label = "Provide a comment (optional)"
                                    append-icon = "mdi-pencil"
                                    v-model = "reviewerComment"
                                >
                                </v-text-field>

                                <v-btn 
                                    :loading = "loadingContent" 
                                    @click = "submitReview"
                                    width = "100%"
                                    class = "my-5 white--text"
                                    color = "#a72693"
                                >
                                    Submit
                                </v-btn>

                            </v-form>
                        </v-card>

                    </v-dialog>

                </div>

                <div>
                    <h4 class="py-3"> CUSTOMER REVIEWS ({{product.reviews.length}}) </h4>
                    <div v-for = "(review, index) in product.reviews" :key = "index" class="body-2 mb-4">

                        <div class="my-2">
                            <v-icon>mdi-account-outline</v-icon>
                            <span> {{review.name}} </span>
                        </div>

                        <div v-if="review.location" class="my-2">
                            <v-icon>mdi-map-marker</v-icon>
                            <span> {{review.location}} </span>
                        </div>

                        <div v-if="review.comment" class="my-2">
                            {{review.comment}}
                        </div>

                        <div>
                            <span v-for="n in review.star" :key="n" clas="my-2">
                                <v-icon small v-textColor="'#FA4748'">mdi-star</v-icon>
                            </span>
                            <span class="px-2">{{review.star}}</span>
                        </div>

                        <v-divider></v-divider>

                    </div>

                </div>

            </div>

        </div>

        <div class="text-center display-1 py-5">Related Products</div>

        <div class="flex-products" >
        <v-card v-for="(product, index) in relatedProducts" :key="index" width="235" class="flex-product-items">

            <div @click="viewProduct(product._id)" style = "cursor: pointer">

                <div class="title py-3" v-textAlign="'center'" v-textColor="'#3787D6'">{{product.details.productName}}</div>
                <v-avatar tile width="100%" height="225">
                    <img :src="product.details.imageSrc" class="product-images">
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
                    </div>
                </v-card-text>
            </div>
        </v-card>
      </div>

    </div>
</template>

<script>
import ProductDataService from "../services/ProductDataService"
import OrderDataService from "../services/OrderDataService"
import ReviewsDataService from "../services/ReviewsDataService"

export default {
    
    data() {
        return {
          
            product: [],
            category: "",
            relatedProducts: [],
            dialog: false,
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
            orderRules: [
                v => !!v || "Thie field is required"
            ],
            quantityRules: [
                v => !!v || "Thie field is required",
                v => v > 0 || "Quantity must be greater than zero",
                v => v <= this.product.details.quantity || "You have exceeded the quantity of this item available in store"
            ],
            emailRules: [
                v => !!v || "Email is required",
                v => /.+@.+\..+/.test(v) || 'E-mail must be a valid email address'
            ],
            reviewRules: [
                v => !!v || "This field is required"
            ],
            loadingContent: false,
            snackbar: false,
            reviewSnackbar: false,
            starRatings: [1, 2, 3, 4, 5],
            reviewerName: "",
            reviewerLocation: "",
            reviewerRating: "",
            reviewerComment: "",
            reviewDialog: false,

            updateProductName: "",
            updateQuantity: "",
            updateProductPrice: "",
            updateProductDescription: "",
            updateProductCategory: "",
            updateProductShipping: "",
            updateProductShippingFee: "",
            updateItems: ["Free", "Paid"],
            updateSnackbar: false,
            file: "",
            storeRules: [
                v => !!v || "This field is required"
            ],
            storeNumberRules: [
                v => !!v || "This field is required",
                v => v > 0 || "Value must be greater than zero"
            ],
            updateDialog: false,
            errorSnackbar: false
        }
    },
    computed: {
        buttonColor() {
            const buttonColor = this.$store.state.bgColor === "#F5F5F5" ?  "#F5F5F5" : "#160f30"

            return buttonColor
            
            //localStorage.setItem("buttonColor", buttonColor)
        },
        routeParams() {
            return this.$route.params.id
        },
        getTotalCost() {
            return Number(this.orderDetails.productDetails.price * this.orderDetails.productDetails.quantity) + Number(this.orderDetails.productDetails.shippingFee)
        },
        getAverageReviews() {

            const ratings = this.product.reviews.map((val) => {
                return val.star
            })

            if(ratings.length !== 0) {
                const sum = ratings.reduce((first, rest) => {
                    return first + rest
                })

                return (sum / ratings.length).toFixed(1)

            } else {

                return 0
            }

        },

        roundUpReviews() {
            return Math.round(this.getAverageReviews)
        },
        getProductImage() {
            return this.product.details.imageSrc
        }
    },

    watch: {

        routeParams() {
            ProductDataService.fetchOne(this.routeParams)
            .then((res) => {
                this.product = res.data 
                this.category = res.data.details.category
                this.getRelatedProducts()
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        },

        getTotalCost() {
            this.orderDetails.productDetails.totalCost = this.getTotalCost
        },

        updateProductShipping() {
            if (this.updateProductShipping === "Free") {
                this.updateProductShippingFee = 0.00
            } else {
                this.updateProductShippingFee = this.product.delivery.shippingFee
            }
        }

    },
    methods: {

        fetchOneProduct() {

            this.$store.state.isLoading = true

            ProductDataService.fetchOne(this.routeParams)
            .then((res) => {
                this.product = res.data 
                this.orderDetails.productDetails.productName = res.data.details.productName
                this.orderDetails.productDetails.productImage = res.data.details.imageSrc
                this.orderDetails.productDetails.price = res.data.details.price
                this.orderDetails.productDetails.shippingFee = res.data.delivery.shippingFee
                this.category = res.data.details.category
                this.getRelatedProducts()

                // fix values for updating form
                this.updateProductName = res.data.details.productName
                this.updateProductPrice = res.data.details.price
                this.updateQuantity = res.data.details.quantity
                this.updateProductCategory = res.data.details.category
                this.updateProductDescription = res.data.details.description
                this.updateProductShipping = res.data.delivery.shipping,
                this.updateProductShippingFee = res.data.delivery.shippingFee
                console.log(res.data)
                this.$store.state.isLoading = false
               
            })
            .catch((err) => {
                console.log(err)
                 this.$store.state.isLoading = false
                 this.$store.state.errorSnackbar = true
            })
        },
    
        addToCart() {

            // push token to cartToken array
            this.$store.state.cartTokens.push(this.$route.params.id)

            // save array in local storage
            localStorage.setItem("cartTokens", JSON.stringify(this.$store.state.cartTokens))

            this.$store.state.cartSnackbar = true;
          
        },

        getRelatedProducts() {
            ProductDataService.getProductsByCategory(this.category)
            .then((res) => {
                this.relatedProducts = res.data 
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        },

        deleteProduct() {
            // delete product from the database after it's quantity has been exhausted
            /**
             * Both deleteProduct and deleteItem do the same thing
             * 
             * But while deleproduct does provide a prompt to the user, deleteItem provides a prompt to the user
             */
            ProductDataService.delete(this.$route.params.id)
            .then((res) => {
                console.log("Item was deleted because it was exhausted from the store")
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            }) 
        },

        updateProductQuantity(){
            ProductDataService.update(this.$route.params.id, {
                productName: this.product.details.productName,
                price: this.product.details.price,
                category: this.product.details.category,
                // update the quantity of the item in store
                quantity: Number(this.product.details.quantity) - Number(this.orderDetails.productDetails.quantity),
                description: this.product.details.description,
                shipping: this.product.delivery.shipping,
                shippingFee: this.product.delivery.shippingFee,
                imageSrc: this.product.details.imageSrc
            })
            .then((res) => {
                console.log(res.data)
                console.log("quantity has been updated")

                /**
                 * Check the current status of the product
                 * 
                 * If it's quantity is zero, execute the delete method
                 */

                ProductDataService.fetchOne(this.$route.params.id)
                .then((res) => {
                   if(res.data.details.quantity === 0) {
                        this.deleteProduct()
                   }
                })
                .catch((err) => {
                    console.log(err)
                })

            })
            .catch((err) => {
                console.log(err)
                console.log("error in updating quantity")
            })
        },

        placeOrder() {
           
            if(this.$refs.form.validate()) {
                
                this.loadingContent = true

                OrderDataService.store(this.orderDetails)
                .then((res) => {
                    console.log(res)
                    this.loadingContent = false
                    this.snackbar = true

                    // after a successful order, update the quantity of the product in db
                    this.updateProductQuantity()

                    // Display the updated version of the product
                    this.fetchOneProduct()

                    // Close the dialog box
                    this.dialog = false

                    // Set placeOrderDialog to false so that it does not open up the form again except if the user is coming from the cart page
                    this.$store.state.placeOrderDialog = false

                    // check if the product was in cart

                    // if it is there, remove it from cart

                    const cartTokens = JSON.parse(localStorage.getItem("cartTokens"))

                    if(cartTokens.indexOf(this.$route.params.id) > -1 ) {
                        cartTokens.splice(cartTokens.indexOf(this.$route.params.id), 1)

                        // reset state.cartTokens to the new cartToken in local storage

                        this.$store.state.cartTokens = cartTokens

                        // save array in local storage
                        localStorage.setItem("cartTokens", JSON.stringify(this.$store.state.cartTokens))
                    }
                })
                .catch((err) => {
                    console.log(err)
                    this.loadingContent = false
                    this.dialog = false
                    this.$store.state.placeOrderDialog = false
                    this.errorSnackbar = true
                })
            }
          
        },

        submitReview() {
            if(this.$refs.reviewForm.validate()) {

                this.loadingContent = true

                ReviewsDataService.store({
                    name: this.reviewerName,
                    location: this.reviewerLocation,
                    star: this.reviewerRating,
                    comment: this.reviewerComment,
                    productId: this.product._id
                })
                .then((res) => {
                    console.log(res.data)
                    this.loadingContent = false;
                    this.reviewSnackbar = true
                    this.reviewDialog = false
                    
                    // fetch the product again so that it will be updated with the review
                    this.fetchOneProduct()
                })
                .catch((err) => {
                    console.log(err)
                    this.loadingContent = false
                    this.reviewDialog = false
                })
            }
        },

        deleteItem() {

            /**
             * Both deleteProduct and deleteItem do the same thing
             * 
             * But while deleproduct does provide a prompt to the user, deleteItem provides a prompt to the user
             */

            if( confirm("Are you sure you want to delete this product?") ) {
                ProductDataService.delete(this.$route.params.id)
                .then((res) => {
                console.log(res)
                this.$store.dispatch('aFetchProducts')
                this.deleteSnackbar = true
                })
                .catch((err) => {
                console.log(err)
                })
            }
     
        },

        updateItem () {

             ProductDataService.update(this.$route.params.id, {
                productName: this.product.details.productName,
                price: this.product.details.price,
                category: this.product.details.category,
                // update the quantity of the item in store
                quantity: this.product.details.quantity,
                description: this.product.details.description,
                shipping: this.product.delivery.shipping,
                shippingFee: this.product.delivery.shippingFee,
                imageSrc: this.product.details.imageSrc
            })
            .then((res) => {
                console.log(res.data)
                this.fetchOneProduct()
            })
            .catch((err) => {
                console.log(err)
            })
        },

        handleFileUpload() {
            const image = document.querySelector("#file")
            this.file = image.files[0]
            console.log(this.file)
        },

        update() {

            if(this.$refs.updateForm.validate()) {

                this.loadingContent = true;

                const formData = new FormData()

                if (this.file !== "" ) {
                    formData.append("image", this.file)
                }
                        
                formData.set("productName", this.updateProductName)
                formData.set("price", this.updateProductPrice)
                formData.set("quantity", this.updateQuantity)
                formData.set("description", this.updateProductDescription)
                formData.set("category", this.updateProductCategory)
                formData.set("shipping", this.updateProductShipping)
                formData.set("shippingFee", this.updateProductShippingFee)
                formData.set("imageSrc", this.product.details.imageSrc)

                ProductDataService.update(this.$route.params.id, formData)
                .then((res) => {
                    this.loadingContent = false;
                    this.createSnackbar = true
                    this.updateDialog = false
                    this.updateSnackbar = true
                    this.fetchOneProduct()
                    console.log(res.data)
                })
                .catch((err) => {
                    console.log(err)
                    this.loadingContent = false;
                    this.errorSnackbar = true
                    this.updateDialog = false
                })
            }
        },

        viewProduct(id) {
            this.$router.push(`/product/${id}`, () => {
                window.scrollTo(0, 0)
            })
    
        }
    },
    mounted() {
        this.fetchOneProduct()

        /**
         * If the user lands on this page after having clicked "place order" on the cart page,
         * 
         * Then the code below automatically opens the dialog box that contains the form to place an order
         */

        if(this.$store.state.placeOrderDialog === true) {
            this.dialog = true
        }
    }
}
</script>

<style scoped>
    .product-grid-container {
        display: grid;
        grid-template-columns: 2fr 3fr;
        column-gap: 50px;
        justify-content: space-around;
    }
    
    .product-image {
        width: 100%; 
        object-fit: contain;
    }

    .flex-items {
        display: flex;
        justify-content: space-between;
    }

    .product-images {
        width: 100%; 
        height: 100%;
        object-fit: fit;
    }

    .flex-actions {
        display: flex;
        justify-content: space-between;
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

  @media (max-width: 500px) {
    .flex-actions {
        display: block;
    }
    .flex-actions div {
        margin-bottom: 20px;
        width: 100%;
    }
    .flex-actions button {
        width: 100%;
    }
  }
  @media (max-width: 886px) {
    .product-grid-container {
        display: grid;
        grid-template-columns: auto;
        row-gap: 50px;
        justify-content: center;
    } 
  }
  
</style>