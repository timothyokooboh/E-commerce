import http from "../http-clients/products-http-common"

class ProductDataService {
    // post data to db
    create(data) {
        return http.post("/", data)
    }

    // fetch all products and find products by product Name
    fetchAll(data) {
        return http.get(`/?title=${data}`)
    }

    //  fetch one product from db

    fetchOne(id) {
        return http.get(`/${id}`)
    }

    // Update one product in db
    update(id, data) {
        return http.patch(`/${id}`, data)
    }

    // delete one product from db
    delete(id) {
        return http.delete(`/${id}`)
    }

    // fetch products by price less than or equal to
    getProductsByPriceLessThan(price) {
        return http.get(`/getbypricelessthan/${price}`)
    }
    // fetch products by price greater than or equal to
    getProductsByPriceGreaterThan(price) {
        return http.get(`/getbypricegreaterthan/${price}`)
    }

    // get products by category
    getProductsByCategory(category) {
        return http.get(`/getbycategory/${category}`)
    }

    // get products by shipping
    getProductsByShipping(shipping) {
        return http.get(`/getbyshipping/${shipping}`)
    }

}

export default new ProductDataService()