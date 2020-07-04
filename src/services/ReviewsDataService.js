import http from "../http-clients/reviews-http-common"

class ReviewsDataService {
    // method for posting reviews to db
    store(data) {
        return http.post("/store", data)
    }
}

export default new ReviewsDataService()