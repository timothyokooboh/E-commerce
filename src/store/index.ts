import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    email: "",
    password: "",
    userToken: "",
    isAuth: false,
    successSnackbar: false,
    errorSnackbar: false,
    loadingContent: false,
  },

  mutations: {
    mSignUp(state) {

      state.loadingContent = true
     // create object for holding our data
      const data = {
        email: state.email,
        password: state.password,
      }
     
      console.log(data)
     
      axios.post("http://localhost:3000/api/user/register", data)
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

      axios.post("http://localhost:3000/api/user/login", data)
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
      const token = localStorage.getItem('token')
      const auth: any = localStorage.getItem('isAuth')

      // check if token exists
      if(!token) {
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
      
      // redirect to dashboard
      router.replace('/auth/user/dashboard')
    },

    mLogOut(state) {
      state.userToken = ""
      state.isAuth = false
      state.loadingContent = false
      localStorage.removeItem("token")
      localStorage.removeItem("expirationDate")
      localStorage.removeItem("isAuth")
      router.replace("/auth/user/login")
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
