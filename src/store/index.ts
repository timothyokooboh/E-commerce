import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import router from '../router'
import ProductDataService from "../services/ProductDataService"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    email: "",
    password: "",
    userToken: "",
    cartTokens: [],
    cart: [],
    searchBar: false,
    isAuth: false,
    successSnackbar: false,
    errorSnackbar: false,
    loadingContent: false,
    products: [],
    items: [],
    productsCategory: [],
    searchTerm: "",
    skeletonLoader: true,
    cartSnackbar: false,
    bgColor: "",
    placeOrderDialog: false,
    isLoading: false,
    searchStatus: false,
  },

  mutations: {
    mSignUp(state) {

      state.loadingContent = true

     // create object for holding our data
      const data = {
        email: state.email,
        password: state.password,
      }
     
      axios.post("api/user/register", data)
      .then((res) => {
        console.log(res)
        state.loadingContent = false
        state.successSnackbar = true
      })
      .catch((err) => {
        console.log(err)
        state.loadingContent = false
        state.errorSnackbar = true
      })
    },

    mLogin(state) {
      state.loadingContent = true

      const data = {
        email: state.email,
        password: state.password
      }

      axios.post("api/user/login", data)
      .then((res) => {
        console.log(res)
        console.log("YOU ARE LOGGED IN")
        state.userToken = res.data.userToken
        state.isAuth = true

        // Redirect user to dashboard
        router.replace('/auth/user/dashboard')


        // Store userToken and expiration date in local storage
        const now = new Date()
        const expiresIn = 3600
        const auth: any = state.isAuth
        const expirationDate: any = new Date(now.getTime() + expiresIn * 1000)
        localStorage.setItem("token", res.data.userToken)
        localStorage.setItem("expirationDate", expirationDate)
        localStorage.setItem("isAuth", auth)

         /**
         * The userToken expires after one hour. The callback function logs out the user automatically after the token has expired.
         */
        setTimeout(() => {
          state.userToken = "";
          state.isAuth = false
          localStorage.removeItem("token")
          localStorage.removeItem("expirationDate")
          localStorage.removeItem("isAuth")
          router.replace('/auth/user/login')
        }, 3600000);

      })
      .catch((err) => {
        console.log(err)
        state.errorSnackbar = true
        state.loadingContent = false
      })
    },

    // Login user automatically if token is in local storage and has not expired
    mAutoLogin(state) {
      const token: any = localStorage.getItem('token')
      const auth: any = localStorage.getItem('isAuth')

      // check if token exists
      if(token === "") {
        return
      }

      const expirationDate: any = localStorage.getItem('expirationDate');
      const now: any = new Date();

      // check if token has expired
      if(now >= expirationDate) {
        return
      }

      // reset userToken to the value of token in local storage

      state.userToken = token
      state.isAuth = auth
      
    },

    mLogOut(state) {
      state.userToken = ""
      state.isAuth = false
      state.loadingContent = false
      localStorage.removeItem("token")
      localStorage.removeItem("expirationDate")
      localStorage.removeItem("isAuth")
      router.replace("/auth/user/login")
    },

    mOpenSearch(state) {
      state.searchBar = true
    },

    mThemeMode(state) {
      const bgColor: string = document.documentElement.style.getPropertyValue("--primary-color")

      if (bgColor === "#F5F5F5") {
        document.documentElement.style.setProperty("--primary-color", "#160f30")
        document.documentElement.style.setProperty("--theme-color", "#F5F5F5")
        state.bgColor = "#160f30"

        localStorage.setItem("bgColor", "#160f30")
        localStorage.setItem("textColor", "#F5F5F5")
      } else {
        document.documentElement.style.setProperty("--primary-color", "#F5F5F5")
        document.documentElement.style.setProperty("--theme-color", "#160f30")
        state.bgColor = "#F5F5F5"

        localStorage.setItem("bgColor", "#F5F5F5")
        localStorage.setItem("textColor", "#160f30")
      }
    
    },

    mSetTheme() {
      const bgColor = localStorage.getItem("bgColor")
      const textColor = localStorage.getItem("textColor")

      document.documentElement.style.setProperty("--primary-color", bgColor)
      document.documentElement.style.setProperty("--theme-color", textColor)

    },

    mFetchProducts(state) {
      state.isLoading = true
      ProductDataService.fetchAll(state.searchTerm)
      .then((res: any) => {
        state.isLoading = false
        state.products = res.data

        if(state.products.length === 0) {
          state.searchStatus = true
        } else {
          state.searchStatus = false
        }
        state.products.map((val) => {
          // create array of categories
          state.items.push(val.details.category)
        })
        //create array of unique categories
        state.productsCategory = Array.from(new Set(state.items))

      })
      .catch((err: any) => {
        state.isLoading = false
        state.errorSnackbar = true
      })
    },

    mGetCartTokens(state) {
      const cartTokens = JSON.parse(localStorage.getItem("cartTokens"))

      if(cartTokens !== null) {
        state.cartTokens = cartTokens
      }

    },

    mGetCartItems(state) {
      state.isLoading = true
      state.cartTokens.map((val) => {
        ProductDataService.fetchOne(val)
        .then((res: any) => {
          state.cart.push(res.data)
          state.isLoading = false
        })
        .catch((err: any) => {

          state.isLoading = false
        })
      })
    }

  },


  actions: {
    aSignUp({commit}) {
      commit("mSignUp")
    },
    aLogin({commit}) {
      commit("mLogin")
    },
    aAutoLogin({commit}) {
      commit("mAutoLogin")
    },
    aLogOut({commit}) {
      commit("mLogOut")
    },
    aOpenSearch({commit}) {
      commit("mOpenSearch")
    },
    aThemeMode({commit}) {
      commit("mThemeMode")
    },
    aSetTheme({commit}) {
      commit("mSetTheme")
    },
    aFetchProducts({commit}) {
      commit("mFetchProducts")
    },
    aGetCartTokens({commit}) {
      commit("mGetCartTokens")
    },
    aGetCartItems({commit}) {
      commit("mGetCartItems")
    }

  },

  getters: {
    email(state) {
        return state.email
      },
    password(state) {
      return state.password
    },
    loadingContent(state) {
      return state.loadingContent
    },
    successSnackbar(state) {
      return state.successSnackbar
    },
    errorSnackbar(state) {
      return state.errorSnackbar
    },
  },

  modules: {
  }
})
