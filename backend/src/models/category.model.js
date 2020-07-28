const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @api {Schema} Category Schema, stating categories properties
 * @apiName CategorySchema
 * @apiGroup Category
 * 
 * @apiParam {String} Title Name of the category.
 * @apiParam {String} Description A little description of the category and its principal caracteristics.
 */
const categorySchema = new Schema({
    title: {
        type: String,
        required: [true, 'Category name is required'],
        maxlength: [20, 'maximum length of category name is 20'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Category name is required'],
        maxlength: [500, 'maximum length of category description is 500'],
        trim: true
    }
})

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;