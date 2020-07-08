
// Initialize axios for http client

import axios from "axios"

export default axios.create({
    baseURL: "api/products",
    headers: {
        "Content-type": "application/json"
    }
})