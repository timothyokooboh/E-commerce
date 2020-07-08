<template>
    <div>

        <v-snackbar top :timeout = "6000" v-model = "createSnackbar">
            Product uploaded successfully
        </v-snackbar>

        <v-snackbar top :timeout = "6000" v-model = "errorSnackbar">
            Something went wrong. Please try again.
        </v-snackbar>
        
        <v-container>
            
            <v-dialog v-model="dialog">
                <template v-slot:activator="{on}">
                    <v-btn color = "#3787D6" fab v-on="on" @click = "dialog =! dialog" id="dialog-btn">
                        <v-icon color = "#fff" large>mdi-plus</v-icon>
                    </v-btn>
                </template>

                <v-card>
                    <v-card-text class="text-center headline pt-2" >Add Product To Store</v-card-text>
                    
                    <v-form class="mx-5 my-2" ref="form"  >
                        <v-text-field
                            label="Product Name"
                            v-model="productName"
                            :rules="storeRules"
                        >   
                        </v-text-field>

                        <v-text-field
                            label="Category"
                            v-model="category"
                            :rules="storeRules"
                        >
                        </v-text-field>

                        <v-text-field
                            label="Product Description"
                            v-model="description"
                            :rules="storeRules"
                        >
                        </v-text-field>

                        <v-text-field
                            label="Price"
                            v-model="price"
                            type="number"
                            prepend-icon="mdi-currency-ngn"
                            :rules="storeNumberRules"
                        >
                        </v-text-field>

                        <v-text-field
                            label="Quantity"
                            v-model="quantity"
                            type="number"
                            :rules="storeNumberRules"
                        >
                        </v-text-field>

                        <v-select
                            label="Select Delivery Mode"
                            v-model="shipping"
                            :items="items"
                            :rules="storeRules"
                        >
                        </v-select>

                        <v-text-field
                            label="Delivery Fee"
                            v-model= "shippingFee"
                            type="number"
                            v-if = "shipping !== 'Free' "
                            prepend-icon="mdi-currency-ngn"
                            :rules="storeNumberRules"
                        >
                        </v-text-field>
                        
                        <v-file-input 
                        label="Upload product image"
                        type="file"
                        :rules="storeRules"
                        @change="handleFileUpload"
                        ref="file"
                        id="file"
                        >
                        </v-file-input>

                        <v-btn @click="submit" :loading="loadingContent" color="#241663" class="white--text mb-5" width="100%">Submit</v-btn>

                    </v-form>
                </v-card>
            </v-dialog>

            <!-- table of orders -->


            <h1> OPEN ORDERS </h1>

            <v-text-field
                v-model = "openSearch"
                append-icon = "mdi-magnify"
                placeholder = "Search"
            >
            </v-text-field>

            <v-data-table
                :headers = "headers"
                :items = "openOrders"
                :items-per-page = "5"
                :search = "openSearch"
                mobile-breakpoint = "764"
                loading = true
                loading-text="Loading... Please wait"
                
            >
                <template v-slot:item.delivered="{item}">
                    <v-chip :color="getColor(item.delivered)" dark> {{item.delivered}} </v-chip>
                </template>


                <template v-slot:item.image="{item}">
                    <v-avatar tile>
                         <v-img :src="item.image" class = "product-image"> </v-img>
                    </v-avatar>
                </template>

                <template v-slot:item.actions="{item}">
                    <v-icon>{{item.actions}}</v-icon>
                </template>


                <template v-slot:item.actions = "{item}" >
                    <div @click="$router.push('/order/update/' +item.itemIndex)">{{item.actions}} </div>
                </template>

            </v-data-table>

            <h1 class="py-5">CLOSED ORDERS</h1>

            <v-text-field
                v-model = "closedSearch"
                append-icon = "mdi-magnify"
                placeholder = "Search"
            >
            </v-text-field>

            <v-data-table
                :headers = "headers"
                :items = "closedOrders"
                :items-per-page = "5"
                :search = "closedSearch"
                mobile-breakpoint = "764"
                loading = true
                loading-text = "Loading... Please wait"
                
            >
                <template v-slot:item.delivered="{item}">
                    <v-chip :color="getColor(item.delivered)" dark> {{item.delivered}} </v-chip>
                </template>

                <template v-slot:item.image="{item}">
                    <v-avatar tile >
                        <v-img :src="item.image"> </v-img>
                    </v-avatar>
                </template>

                <template v-slot:item.actions="{item}">
                    <v-icon :v-text="item.actions"></v-icon>
                </template>


                <template v-slot:item.actions = "{item}" >
                    <div @click="$router.push('/order/update/' +item.itemIndex)">{{item.actions}} </div>
                </template>

            </v-data-table>

        </v-container>
    </div>
</template>

<script>
import ProductDataService from "../services/ProductDataService"
import OrderDataService from "../services/OrderDataService"

export default {
    name: 'Home',
    data() {
        return {
            createSnackbar: false,
            dialog: false,
            file: "",
            productName: "",
            category: "",
            description: "",
            price: "",
            quantity: "",
            shipping: "",
            shippingFee: "", 
            items: ["Free", "Paid"],
            loadingContent: false,
            storeRules: [
                v => !!v || "This field is required"
            ],
            storeNumberRules: [
                v => !!v || "This field is required",
                v => v > 0 || "Value must be greater than zero"
            ],

            openSearch: "",
            closedSearch: "",
            
            headers: [
                {
                    text: "First name",
                    value: "firstName",
                },
                {
                    text: "Last name",
                    value: "lastName"
                },
                {
                    text: "Phone",
                    value: "phone"
                },
                {
                    text: "Email",
                    value: "email"
                },
                {
                    text: "Shipping address",
                    value: "shippingAddress"
                },
                {
                    text: "Product name",
                    value: "productName"
                },
                {
                    text: "Quantity",
                    value: "quantity"
                },
                {
                    text: "Total cost",
                    value: "totalCost"
                },
                {
                    text: "Delivered",
                    value: "delivered"
                },
                {
                    text: "Image",
                    value: "image"
                },
                {
                    text: "Actions",
                    value: "actions",
                    sortable: false
                }
            ],

            openOrders: [],
            closedOrders: [],
            editDialog: false,
            errorSnackbar: false
                
        }
    },
    watch: {
        shipping() {
            if (this.shipping === "Free") {
                this.shippingFee = 0.00
            } else {
                this.shippingFee = 100.00
            }
        }
    },
    methods: {
        submit() {

            this.loadingContent = true;

            const formData = new FormData()

            formData.append("image", this.file)
                    
            formData.set("productName", this.productName)
            formData.set("price", this.price)
            formData.set("quantity", this.quantity)
            formData.set("description", this.description)
            formData.set("category", this.category)
            formData.set("shipping", this.shipping)
            formData.set("shippingFee", this.shippingFee)

            ProductDataService.create(formData)
            .then((res) => {
                this.loadingContent = false;
                this.createSnackbar = true
                this.dialog = false
            })
            .catch((err) => {
                console.log(err)
                this.loadingContent = false;
                this.errorSnackbar = true
                this.dialog = false
            })

        },

         handleFileUpload() {
            const image = document.querySelector("#file")
            this.file = image.files[0]
            console.log(this.file)
        },

        getColor(delivered) {
            if(delivered === true) return "green"
            return "orange"
        }
    },

    mounted() {

        OrderDataService.index()
        .then((res) => {
            console.log(res.data)

            const openOrders = res.data.filter((val) => {
                return val.productDetails.delivered === false
            })

            const closedOrders = res.data.filter((val) => {
                return val.productDetails.delivered === true
            })

            openOrders.map((val) => {
                 this.openOrders.push({
                    firstName: val.contactDetails.firstName,
                    lastName: val.contactDetails.lastName,
                    phone: val.contactDetails.phone,
                    email: val.contactDetails.email,
                    shippingAddress: val.contactDetails.shippingAddress,
                    productName: val.productDetails.productName,
                    quantity: val.productDetails.quantity,
                    totalCost: val.productDetails.totalCost,
                    delivered: val.productDetails.delivered, 
                    image: val.productDetails.productImage, 
                    itemIndex: val._id,
                    actions: "mdi-pencil"
                })
            })

            closedOrders.map((val) => {
                 this.closedOrders.push({
                    firstName: val.contactDetails.firstName,
                    lastName: val.contactDetails.lastName,
                    phone: val.contactDetails.phone,
                    email: val.contactDetails.email,
                    shippingAddress: val.contactDetails.shippingAddress,
                    productName: val.productDetails.productName,
                    quantity: val.productDetails.quantity,
                    totalCost: val.productDetails.totalCost,
                    delivered: val.productDetails.delivered, 
                    image: val.productDetails.productImage, 
                    itemIndex: val._id,
                    actions: "mdi-pencil"
                })
            })

            
        })
        .catch((err) => {
            console.log(err)
        })
    }
}
</script>

<style scoped>
    #dialog-btn {
        position: fixed;
        bottom: 100px;
        right: 10px;
    }
    
</style>