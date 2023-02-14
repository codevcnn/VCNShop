import BaseError from "./base_error.js"

class APIFeatures {
    data = undefined;

    constructor(model, query) {
        this.model = model
        this.query = query
    }

    async getProducts() {
        try {
            let queryObject = {
                name: { $regex: new RegExp('.*') },
            }

            if (this.query.keyword) //get products by name
                queryObject.name = { $regex: new RegExp(this.query.keyword) }
            if (this.query.category) //get products by category
                queryObject.category = this.query.category
            if (this.query.price) //get products by price
                queryObject['price.value'] =
                    { $gte: this.query.price * 1, $lte: this.query.price * 1 }
            if (this.query.rating) //get products by rating
                queryObject['review.rating'] = { $gte: this.query.rating * 1 }

            let sort = this.query.sort || { name: 'name', type: 1 }

            let limit = this.query.limit * 1

            this.data = await this.model
                .find(queryObject)
                .sort({ [sort.name]: sort.type })
                .limit(limit)
                .lean()

            if (!this.data) throw new BaseError('Error Query in  API features', 400, 'API features')

        } catch (error) {
            this.data = error
        }
    }

    async productsFilter() {
        try {
            let { category, price, rating } = this.query
            if (!category && !price && !rating) return

            this.data = this.data.filter((product) =>
                (category ? product.category === category : true) &&
                (price ? product.price.value >= (price.gte * 1) &&
                    product.price.value <= (price.lte * 1) : true) &&
                (rating ? product.review.rating >= (rating * 1) : true)
            )

            if (!this.data) throw new BaseError('Error Query in  API features', 400, 'API features')

        } catch (error) {
            this.data = error
        }
    }

    async getTopProducts() {
        try {
            let { sold, rating, limit, topWeek } = this.query
            limit = limit * 1

            if (topWeek || topWeek === 'true') {
                this.data = await this.model.aggregate([
                    { $match: {} },
                    { $sort: { 'sold.in_a_week': -1 } },
                    { $limit: limit }
                ])
                return
            }
            if (sold || sold === 'true') {
                this.data = await this.model.aggregate([
                    { $match: {} },
                    { $sort: { 'sold.count': -1 } },
                    { $limit: limit }
                ])
                return
            }
            if (rating || rating === 'true') {
                this.data = await this.model.aggregate([
                    { $match: {} },
                    { $sort: { 'review.rating': -1 } },
                    { $limit: limit }
                ])
                return
            }

            if (!this.data) throw new BaseError('Error Query in  API features', 400, 'API features')

        } catch (error) {
            this.data = error
        }
    }
}

export default APIFeatures