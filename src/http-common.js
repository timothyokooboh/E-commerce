
// Initialize axios for http client

import axios from "axios"

export default axios.create({
    baseURL: "http://localhost:3000/api/user",
    headers: {
        "Content-type": "application/json"
    }
})