// initialize axios http client

import Axios from "axios";

export default Axios.create({
    baseURL: "http://localhost:3000/api/reviews",
    headers: {
        "Content-type": "application/json"
    }
})