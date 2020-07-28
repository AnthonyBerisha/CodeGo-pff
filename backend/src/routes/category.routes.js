const categoryRouter = require('express').Router();
let Category = require('../models/category.model');
const checkAccessToken = require('../middleware/access.middleware');

/**
 * @api {Get} /category/:title Return category information
 * @apiName GetCurrentCategoryInformation
 * @apiGroup Category
 * 
 * @apiParam {String} Title Used to retrieve the category.
 *
 * @apiSuccess {Object} Category The category and all its data.
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "category": {
 *          "title": "Confiture",
 *          "description": "La confiture ça dégouline, ça passe par les trous d'la tartine."
 *       }
 *    }
 * 
 * @apiError error404 Category not found.
 * @apiError error500 Internal server error.
 * 
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 404 Category not found
 *    {
 *      "error": "CategoryNotFound"
 *    }
 */
categoryRouter.route('/:title').get((req, res) => {
    Category.findOne({title: req.params.title })
        .then(result => {
        // console.log(result);
            if (result === null) {
                res.status(404).json('Category not found.')
            } else {
                res.status(200).json(result)
            }
        })
        .catch(err => {
            res.status(500).json('Error ' + err)
        })
});

/**
 * @api {Get} /category Return all categories
 * @apiName GetCategoryInformation
 * @apiGroup Category
 *
 * @apiSuccess {Object} Categories The categories as consultables objects.
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "category": {
 *          "id": "(random_string)",
 *          "title": "Confiture",
 *          "description": "La confiture ça dégouline, ça passe par les trous d'la tartine."
 *       }
 *    }
 * 
 * @apiError error500 Internal server error.
 * 
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 500 Internal server error
 *    {
 *      "error": "InternalServerError"
 *    }
 */
categoryRouter.route('/').get((req, res) => {
    Category.find()
        .then(category => res.status(200).json(category))
        .catch(err => res.status(500).json('Error: ' + err));
});

/**
 * @api {Post} /category Create a category
 * @apiName CreateCategory
 * @apiGroup Category
 *
 * @apiParam {String} Title The name of the category.
 * @apiParam {String} Description A bit of information about the category.
 * 
 * @apiSuccess {String} Title The name of the category.
 * @apiSuccess {String} Description A bit of information about the category.
 * @apiSuccess {Object} Categoriy The category as a consultable object.
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 Category created
 *    {
 *      "category": {
 *          "id": "(random_string)",
 *          "title": "Confiture",
 *          "description": "La confiture ça dégouline, ça passe par les trous d'la tartine."
 *       }
 *    }
 * 
 * @apiError error400 Bad input.
 * 
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 400 Bad input
 *    {
 *      "error": "BadInput"
 *    }
 */
categoryRouter.route('/').post(checkAccessToken, (req, res) => {
    if (!req.tokenData.admin) {
        res.status(403).json({ error: "Access forbidden." });
    }
    const title = req.body.title;
    const description = req.body.description;
    console.log(description);
    const newCategory = new Category({
        title,
        description,
        image
    });

    newCategory.save()
        .then(() => res.status(201).json('Category created!'))
        .catch(err => res.status(400).json('Error ' + err));
});


/**
 * @api {delete} /category/:id Delete a category
 * @apiName DeleteCategory
 * @apiGroup Category
 * 
 * @apiParam {ObjectId} CategoryId The id of the category, generated at its creation.
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 Category deleted
 * 
 * @apiError error404 Category not found.
 * @apiError error500 Internal server error.
 * 
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 404 Category not found
 *    {
 *      "error": "CategoryNotFound"
 *    }
 */
categoryRouter.route('/:id').delete(checkAccessToken, (req, res) => {
    if (!req.tokenData.admin) {
        res.status(403).json({ error: "Access forbidden." });
    }
    Category.findByIdAndDelete(req.params.id)
        .then(result => {
            console.log(result);
            if (result === null) {
                res;status(404).json('Category not found.')
            } else {
                res.status(200).json('Category deleted.')
            }
        })
        .catch(err => {
            res.status(500).json('Error ' + err)
        })
    });

/**
 * @api {Put} /category/:id Update a category
 * @apiName UpdateCategory
 * @apiGroup Category
 *
 * @apiParam {ObjectId} CategoryId The id of the category, generated at its creation.
 * 
 * @apiSuccess {String} Title The name of the category.
 * @apiSuccess {String} Description A bit of information about the category.
 * @apiSuccess {Object} Category The category as a consultable object.
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 Category updated
 *    {
 *      "category": {
 *          "id": "(random_string)",
 *          "title": "Confiture",
 *          "description": "La confiture ça dégouline, ça passe par les trous d'la tartine."
 *       }
 *    }
 * 
 * @apiError error400 Bad input.
 * @apiError error500 Internal server error.
 * 
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 400 Bad input
 *    {
 *      "error": "BadInput"
 *    }
 */
categoryRouter.route('/:id').put(checkAccessToken, (req, res) => {
    if (!req.tokenData.admin) {
        res.status(403).json({ error: "Access forbidden." });
    }
    Category.findById(req.params.id)
        .then(product => {
            // console.log(product);
            if (category === null) {
                res.status(404).json('Category not found.')
            } else {
                category.name = req.body.name;
                category.description = req.body.description;

                category.save()
                    .then(() => res.status(200).json('Category updated!'))
                    .catch(err => res.status(400).json('Error ' + err));
            }
        })
        .catch(err => res.status(500).json('Error ' + err));
})

module.exports = categoryRouter;