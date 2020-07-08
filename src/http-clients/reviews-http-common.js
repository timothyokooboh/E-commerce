// initialize axios http client

import Axios from "axios";

export default Axios.create({
    baseURL: "api/reviews",
    headers: {
        "Content-type": "application/json"
    }
})