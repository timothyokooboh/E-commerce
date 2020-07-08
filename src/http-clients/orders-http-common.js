import axios from "axios"

export default axios.create({
    baseURL: "api/orders",
    headers: {
       "Content-type": "application/json"
    }
})

