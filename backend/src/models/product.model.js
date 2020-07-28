const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Ingredient =require('./ingredient.model');

/**
 * @api {Schema} Product Schema, stating products properties
 * @apiName ProductSchema
 * @apiGroup Product
 * 
 * @apiParam {String} Name Name of the product.
 * @apiParam {String} Description A short description of the product.
 * @apiParam {Number} Price Price of the product.
 * @apiParam {String} Image A picture of the product as an URL. 
 * @apiParam {Boolean} InStock Attribute stating the disponibility of the product.
 * @apiParam {Object} Category Product's category of aliment.
 * @apiParam {Boolean} Favorite State the status of the product, to eventually be promoted in homepage.
 */
const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        maxlength: [20, 'maximum length of product name is 20'],
        trim: true
    },
    description: {
        type: String,
        maxlength: [200, 'maximum length of product name is 200'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Product price is required']
    },
    image: {
        type: String,
        required: [true, 'Product image is required']
    },
    inStock: {
        type: Boolean,
        default: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Product category is required'],
    },
    favorite: {
        type: Boolean,
        default: false
    }
    // ingredients: {
    //     type: Schema.Types.ObjectsId,
    //     ref: 'Ingredient'
    // }
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
