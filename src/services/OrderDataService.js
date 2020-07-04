
import http from "../http-clients/orders-http-common"

class OrderDataService {
    // post data to db
    store(data) {
        return http.post("/", data)
    }

    // fetch all orders
    index() {
        return http.get()
    }

    //  fetch one order from db

    show(id) {
        return http.get(`/${id}`)
    }

    // Update one order in db
    update(id, data) {
        return http.patch(`/${id}`, data)
    }

    // delete one order from db
    delete(id) {
        return http.delete(`/${id}`)
    }

}

export default new OrderDataService()