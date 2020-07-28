const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

/**
 * @api {Schema} Order Schema, stating orders properties
 * @apiName OrderSchema
 * @apiGroup Order
 * 
 * @apiParam {Date} Date Day on which the order was placed.
 * @apiParam {Number} Price Price of the product.
 * @apiParam {String} Status State of the order: "Cancelled", "In progres", "Ready"...
 * @apiParam {Object} Products Products included in the order. 
 * @apiParam {Object} UserId Individual Id allowing customer identification.
 * @apiParam {Object} ItemsCount Number of items inside the cart.
 */
const orderSchema = new Schema({
    date: {
        type: Date,
        required: [true],
    },
    price: {
        type: Number,
        required: [true],
    },
    status: {
        type: String,
        enum: ['Enregistrée', 'En préparation', 'Prête', 'Annulée', 'Terminée'],
        required: [true],
        trim: true,
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Products are required to order'],
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    itemsCount: {
        type: Array,
        required: [true],
    }
});


orderSchema.plugin(idValidator);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
