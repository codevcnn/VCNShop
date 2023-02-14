import APIFeatures from "../utils/api_features.js"
import ProductsModel from '../models/product_schema.js'
import UsersModel from '../models/user_schema.js'
import BaseError from "../utils/base_error.js"
import storage from '../configs/firebase.js'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import ShopsModel from '../models/shop_schema.js'

//get a product by _id
const getOneProduct = async (req, res, next) => {
    try {
        if (!req.params) throw new BaseError('Params doesn\'t exist', 400)
        if (!req.params.productId) throw new BaseError('Wrong request property', 400)

        let product = await ProductsModel.findOne({ _id: req.params.productId }).lean()
        let shopInfo = await ShopsModel.findOne(
            { username: product.shop.username },
            { 'name': 1, 'username': 1, 'greeting': 1, 'background': 1, 'avatar': 1 }
        ).lean()

        if (!product) throw new BaseError('Product not found', 400)
        if (!shopInfo) throw new BaseError('Shop not found', 400)

        res.status(200).json({
            product: product,
            shopInfo,
        })

    } catch (error) {
        next(error)
    }
}

//get some products by query
const getProducts = async (req, res, next) => {
    try {
        let products = new APIFeatures(ProductsModel, req.query)

        await products.getProducts()
        if (products.data instanceof Error) throw products.data

        res.status(200).json({
            products: products.data,
        })
    } catch (error) {
        next(error)
    }
}

//get top week , best selling
const getTopProducts = async (req, res, next) => {
    try {
        let products = new APIFeatures(ProductsModel, req.query)

        await products.getTopProducts()

        if (products.data instanceof Error) throw products.data

        res.status(200).json({
            products: products.data,
        })
    } catch (error) {
        next(error)
    }
}

const uploadImages = async (req, res, next) => {
    try {
        let { images } = req.files //array

        if (!(Symbol.iterator in Object(images))) //check if file is iterable ?
            images = [images]
        if (images.length === 0) throw new BaseError('Files is empty', 400)

        let { productId, username, type: uploadType } = req.query
        if (!productId || !username || !uploadType)
            throw new BaseError('Wrong property name', 400)

        let image_urls = []

        let upload_result = await new Promise((resolve, reject) => {
            for (let { name: fileName, data: fileData } of images) {
                const storageRef = ref(storage, '/products/' + 'MongoDBId_' + productId +
                    '/reviews/' + username + '/' + fileName)

                const uploadTask = uploadBytesResumable(
                    storageRef, fileData, { customMetadata: { type: uploadType } }
                )

                uploadTask.on(
                    'state_changed',
                    (snapshot) => { },
                    (error) => {
                        switch (error.code) {
                            case 'storage/object-not-found':
                                reject(new BaseError(`File doesn't exist`, 400))
                            case 'storage/unauthorized':
                                reject(new BaseError(
                                    `User doesn't have permission to access the object`, 400
                                ))
                            case 'storage/canceled':
                                reject(new BaseError(`User canceled the upload`, 400))
                            case 'storage/unknown':
                                reject(new BaseError(
                                    `Unknown error occurred, inspect the server response`, 400
                                ))
                        }
                    },
                    async () => {
                        let downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
                        image_urls.push(downloadURL)

                        if (image_urls.length === images.length) {

                            image_urls = Array.from(new Set(image_urls))
                            
                            resolve('Upload Done')
                        }
                    }
                )
            }
        })

        if (upload_result instanceof Error) throw upload_result

        res.status(200).json({
            uploadImagesMessage: 'Success to upload the images',
            imageURLs: image_urls,
        })
    } catch (error) {
        next(error)
    }
}

//insert new review to DB
const newReview = async (req, res, next) => {
    try {
        let { username: user_username, productId } = req.query
        let { rating, comment, title, imageURLs } = req.body

        if (!user_username || !productId || !rating || !comment || !title || !imageURLs)
            throw new BaseError('Wrong property name', 400)

        let user_info = await UsersModel.findOne(
            { username: user_username }, { 'name': 1, 'avatar': 1 }
        ).lean()
        if (!user_info) throw new BaseError('User not found', 400)

        let product = await ProductsModel.findOne({ _id: productId }).lean()
        if (!product) throw new BaseError('Product not found', 400)

        let { reviews } = product.review

        let new_reviews = [] //init new review list to ready for update

        if (reviews.length > 0) {
            //delete exited review
            new_reviews = reviews.filter(({ username }) => username !== user_username)
        }

        let new_review = { //the new review was submitted by user
            name: user_info.name,
            username: user_username,
            avatar: user_info.avatar,
            createdOn: new Date(),
            rating,
            title,
            comment,
            imageURLs,
        }

        new_reviews = [new_review, ...new_reviews,] //update new review list

        let new_rating //init rating average
        let new_reviews_length = new_reviews.length //review count

        //caculate new average rating
        if (new_reviews_length > 0) {
            new_rating = new_reviews.reduce((accumulator, { rating }) => accumulator + rating, 0)
            new_rating = Math.round(new_rating.toFixed(3) * 1)
            new_rating /= new_reviews_length
        }
        else new_rating = rating

        //update product data with new review data
        await ProductsModel.updateOne(
            { _id: productId },
            {
                $set: { //update the review field
                    'review.rating': new_rating,
                    'review.reviews': new_reviews,
                    'review.count': new_reviews_length,
                }
            }
        )

        res.status(200).json({
            newReview: new_review,
            newRating: new_rating,
            newRatingCount: new_reviews_length,
            newReviewMessage: 'Success to submit the new review',
        })
    } catch (error) {
        next(error)
    }
}

export {
    getProducts, getTopProducts, getOneProduct,
    newReview, uploadImages,
}