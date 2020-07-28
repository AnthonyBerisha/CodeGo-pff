const productRouter = require('express').Router();
let Product = require('../models/product.model');
const checkAccessToken = require('../middleware/access.middleware');
const ObjectId = require('mongoose').Types.ObjectId;


/**
 * @api {Get} /product/favorite Return all favorite products
 * @apiName GetAllFavoriteProducts
 * @apiGroup Product
 *
 * @apiSuccess {Object} Product All favorite products to order as consultable objects.
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "product": {
 *          "_id": ObjectId
 *          "name": "Chutney de mangue",
 *          "description": "Un truc plutot pas mal",
 *          "price": "5.49",
 *          "image":"(url)",
 *          "category": {
 *              "title": "chutney",
 *              "description": "Préparation aigre-douce, à la texture de confiture, réalisée à partir de fruits ou de légumes cuits dans du vinaigre, avec du sucre et des épices."
*            }
            "inStock": "true",
            "favorite": "true",
 *        }
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
productRouter.route('/favorite').get((req, res) => {
  Product.find({favorite: true})
    .populate("category")
    .then(products => {
      console.log(products);
      res.status(200).json(products)
     })
    .catch(err => res.status(500).json({ error: err }));
});


/**
 * @api {Get} /product Return all products
 * @apiName GetAllProducts
 * @apiGroup Product
 * 
 * @apiParam {String} Name Name of the product.
 * @apiParam {String} Description A description of the product.
 * @apiParam {Number} Price The price of the product.
 * @apiParam {String} Image An image of the product.
 * @apiParam {Object} Category The category of the product.
 * @apiParam {Boolean} InStock State the disponibility of the product.
 * @apiParam {Boolean} Favorites Display the product in homepage if true.
 *
 * @apiSuccess {Object} Product All products to order as consultable objects.
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "product": {
 *          "name": "Chutney de mangue",
 *          "description": "Un truc plutot pas mal",
 *          "price": "5.49",
 *          "image":"(url)",
 *          "inStock": "false",
 *          "favorites": "false",
 *          "category": {
 *              "title": "chutney",
 *              "description": "Préparation aigre-douce, à la texture de confiture, réalisée à partir de fruits ou de légumes cuits dans du vinaigre, avec du sucre et des épices."
 *          }
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
productRouter.route('/').get((req, res) => {
    Product.find()
      .populate("category")
      .then(products => {
        // console.log(products);
        res.status(200).json(products)
       })
      .catch(err => res.status(500).json({ error: err }));
  });


/**
 * @api {Post} /product Add a product
 * @apiName AddProduct
 * @apiGroup Product
 * 
 * @apiParam {Boolean} Admin State the access level of the user.
 * @apiParam {String} Name Name of the product.
 * @apiParam {String} Description A description of the product.
 * @apiParam {Number} Price The price of the product.
 * @apiParam {String} Image An image of the product.
 * @apiParam {Object} Category The category of the product.
 * @apiParam {Boolean} InStock State the disponibility of the product.
 * @apiParam {Boolean} Favorites Display the product in homepage if true.
 *
 * @apiSuccess {Object} Product All products to order as consultable objects.
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 Product added
 *    {
 *      "product": {
 *          "name": "Chutney de mangue",
 *          "description": "Un truc plutot pas mal",
 *          "price": "5.49",
 *          "image":"(url)",
 *          "inStock": "false",
 *          "favorites": "false",
 *          "category": {
 *              "title": "chutney",
 *              "description": "Préparation aigre-douce, à la texture de confiture, réalisée à partir de fruits ou de légumes cuits dans du vinaigre, avec du sucre et des épices."
 *          }
 *    }
 * 
 * @apiError error403 Access forbidden.
 * @apiError error500 Internal server error.
 * 
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 500 Internal server error
 *    {
 *      "error": "InternalServerError"
 *    }
 */
productRouter.route('/').post(checkAccessToken, (req, res) => {
  if (!req.tokenData.admin) {
    res.status(403).json({ error: "Access forbidden." });
  }
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const image = req.body.image;
    const category = req.body.category;
    
    
    const newProduct = new Product({
      name,
      description,
      price,
      image,
      category,
      // favorite
    });
    
    newProduct.save()
    .then(() => res.status(201).json('Product added!'))
    .catch(err => res.status(400).json({ error: err }));
  });

/**
 * @api {Get} /product/cart/:id To get product and push them into the cart
 * @apiName GetProductsIntoCart
 * @apiGroup Product
 * 
 * @apiParam {ObjectId} ProductId The ids of the ordered products.
 *
 * @apiSuccess {Object} Product Products send and displayed in the cart.
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "product": {
 *          "name": "Chutney de mangue",
 *          "description": "Un truc plutot pas mal",
 *          "price": "5.49",
 *          "image":"(url)",
 *          "inStock": "false",
 *          "favorites": "false",
 *          "category": {
 *              "title": "chutney",
 *              "description": "Préparation aigre-douce, à la texture de confiture, réalisée à partir de fruits ou de légumes cuits dans du vinaigre, avec du sucre et des épices."
 *          }
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
productRouter.route('/cart/:id').get((req, res) => {
  const ids = req.params.id.split(',');
  let _id=[];
  ids.forEach(id => {
    _id.push(ObjectId(id));
  })
  Product.find({'_id': {'$in': _id}})
    .then(products => res.status(200).json(products))
    .catch(err => res.status(500).json('Error: ' + err));
});

/**
 * @api {Get} /product/category?categories=123456,789240 Return all products by category
 * @apiName GetAllProductsByCategory
 * @apiGroup Product
 * 
 * @apiParam {Array} CategoryId Identification of the categories (to be sent as query and not as param).
 *
 * @apiSuccess {Object} Product All products associated with selected category.
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "product": {
 *          "name": "Chutney de mangue",
 *          "description": "Un truc plutot pas mal",
 *          "price": "5.49",
 *          "image":"(url)",
 *          "inStock": "false",
 *          "favorites": "false",
 *          "category": {
 *              "title": "chutney",
 *              "description": "Préparation aigre-douce, à la texture de confiture, réalisée à partir de fruits ou de légumes cuits dans du vinaigre, avec du sucre et des épices."
 *          }
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
productRouter.route('/category').get((req, res) => {
  // console.log('categories: ' + req.query);
  Product.find({ category: { $in: req.query.categories } })
    .populate("category")
    .then(result => {
    // console.log(result);
      if (result === null) {
        res.status(404).json('No product found.')
      } else {
      res.status(200).json(result)
      }
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
});

/**
 * @api {Get} /product/browse/advanced?query=olive&categories=123456,789012 Return products that match a query among specific categories
 * @apiName BrowseByQueryAndCategory
 * @apiGroup Product
 * 
 * @apiParam {String} Query Query to be performed among products (to be sent as query and not as param).
 * @apiParam {Array} CategoryId Identification of the categories (to be sent as query and not as param).
 *
 * @apiSuccess {Object} Product All products matching the query among the selected categories.
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "product": {
 *          "name": "Chutney de mangue",
 *          "description": "Un truc plutot pas mal",
 *          "price": "5.49",
 *          "image":"(url)",
 *          "inStock": "false",
 *          "favorites": "false",
 *          "category": {
 *              "title": "chutney",
 *              "description": "Préparation aigre-douce, à la texture de confiture, réalisée à partir de fruits ou de légumes cuits dans du vinaigre, avec du sucre et des épices."
 *          }
 *    }
 * 
 * @apiError error404 No result found.
 * @apiError error500 Internal server error.
 * 
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 404 Not found
 *    {
 *      "error": "No result found"
 *    }
 */
productRouter.route('/browse/advanced').get((req, res) => {
  const query = req.query;
  // console.log(query);
  Product.find({ name: new RegExp(query.query, 'i') })
    .where({ category: { $in: query.categories } })
    .populate("category")
    .then(result => {
      if (result === null) {
        res.status(404).json('No result found.')
      } else {
        res.status(200).json(result)
      }
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
})

/**
 * @api {Get} /product/browse?query=olive Return products that match a query
 * @apiName BrowseByQuery
 * @apiGroup Product
 * 
 * @apiParam {String} Query Query to be performed among products (to be sent as query and not as param).
 *
 * @apiSuccess {Object} Product All products matching the query.
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "product": {
 *          "name": "Chutney de mangue",
 *          "description": "Un truc plutot pas mal",
 *          "price": "5.49",
 *          "image":"(url)",
 *          "inStock": "false",
 *          "favorites": "false",
 *          "category": {
 *              "title": "chutney",
 *              "description": "Préparation aigre-douce, à la texture de confiture, réalisée à partir de fruits ou de légumes cuits dans du vinaigre, avec du sucre et des épices."
 *          }
 *    }
 * 
 * @apiError error404 No result found.
 * @apiError error500 Internal server error.
 * 
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 404 Not found
 *    {
 *      "error": "No result found"
 *    }
 */
productRouter.route('/browse').get((req, res) => {
  const query = req.query.query;
  // console.log(req.query);
  Product.find({ name: new RegExp(query, 'i') })
    .populate("category")
    .then(result => {
      if (result === null) {
        res.status(404).json('No result found.')
      } else {
        res.status(200).json(result)
      }
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
})

/**
 * @api {Get} /product/:id Return product by id
 * @apiName GetProductById
 * @apiGroup Product
 * 
 * @apiParam {ObjectId} ProductId Identification of the product.
 *
 * @apiSuccess {Object} Product Retuen a product associated with selected id.
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "product": {
 *          "name": "Chutney de mangue",
 *          "description": "Un truc plutot pas mal",
 *          "price": "5.49",
 *          "image":"(url)",
 *          "inStock": "false",
 *          "favorites": "false",
 *          "category": {
 *              "title": "chutney",
 *              "description": "Préparation aigre-douce, à la texture de confiture, réalisée à partir de fruits ou de légumes cuits dans du vinaigre, avec du sucre et des épices."
 *          }
 *    }
 * 
 * @apiError error404 Product not found.
 * @apiError error500 Internal server error.
 * 
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 500 Product not found
 *    {
 *      "error": "ProductNotfound"
 *    }
 */
productRouter.route('/:id').get((req, res) => {
  Product.findById(req.params.id)
    .populate("category")
    .then(result => {
    // console.log(result);
      if (result === null) {
        res.status(404).json('Product not found.')
      } else {
      res.status(200).json(result)
      }
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
});

/**
 * @api {Delete} /product/:id Delete product 
 * @apiName DeleteProduct
 * @apiGroup Product
 * 
 * @apiParam {ObjectId} ProductId Identification of the product.
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 Product deleted
 * 
 * @apiError error403 Access forbidden.
 * @apiError error404 Product not found.
 * @apiError error500 Internal server error.
 * 
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 404 Product not found
 *    {
 *      "error": "ProductNotfound"
 *    }
 */
productRouter.route('/:id').delete(checkAccessToken, (req, res) => {
  if (!req.tokenData.admin) {
    res.status(403).json({ error: "Access forbidden." });
  }
  Product.findByIdAndDelete(req.params.id)
    .then(result => {
      // console.log(result);
      if (result === null) {
        res.status(404).json('Product not found.')
      } else {
      res.status(200).json('Product deleted.')
      }
    })
    .catch(err => {
        res.status(500).json({ error: err })
    })
});

/**
 * @api {Put} /product Update a product
 * @apiName UpdateProduct
 * @apiGroup Product
 * 
 * @apiParam {Boolean} Admin State the access level of the user.
 * @apiParam {Object} ProductId Identification of the product.
 * @apiParam {String} Name Name of the product.
 * @apiParam {String} Description A description of the product.
 * @apiParam {Number} Price The price of the product.
 * @apiParam {String} Image An image of the product.
 * @apiParam {Object} Category The category of the product.
 * @apiParam {Boolean} InStock State the disponibility of the product.
 * @apiParam {Boolean} Favorites Display the product in homepage if true.
 *
 * @apiSuccess {Object} Product All products to order as consultable objects.
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 Product updated
 *    {
 *      "product": {
 *          "name": "Chutney de mangue",
 *          "description": "Un truc plutot pas mal",
 *          "price": "5.49",
 *          "image":"(url)",
 *          "inStock": "false",
 *          "favorites": "false",
 *          "category": {
 *              "title": "chutney",
 *              "description": "Préparation aigre-douce, à la texture de confiture, réalisée à partir de fruits ou de légumes cuits dans du vinaigre, avec du sucre et des épices."
 *          }
 *    }
 * 
 * @apiError error403 Access forbidden.
 * @apiError error500 Internal server error.
 * 
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 500 Internal server error
 *    {
 *      "error": "InternalServerError"
 *    }
 */
productRouter.route('/:id').put(checkAccessToken, (req, res) => {
  if (!req.tokenData.admin) {
    res.status(403).json({ error: "Access forbidden." });
  }
  Product.findById(req.params.id)
    .then(product => {
      // console.log(product);
      if (product === null) {
        res.status(404).json('Product not found.')
      } else {
        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        product.image = req.body.image;
        product.category = req.body.category;
        product.favorite = req.body.favorite;

        product.save()
          .then(() => res.status(200).json('Product updated!'))
          .catch(err => res.status(400).json({ error: err }));
      }
    })
    .catch(err => res.status(500).json({ error: err }));
})

/**
 * @api {Patch} /product/:id To patch one product information. Admin usage
 * @apiName PatchProductInformation
 * @apiGroup Product
 * 
 * @apiParam {ObjectId} _id Unique. Used to retrieve products.
 *
 * @apiSuccess {Object} Product Product and all its data.
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 Product patched
 *    {
 *      "product": {
 *          "name": "Chutney de mangue",
 *          "description": "Un truc plutot pas mal",
 *          "price": "5.49",
 *          "image":"(url)",
 *          "inStock": "false",
 *          "favorites": "false",
 *          "category": {
 *              "title": "chutney",
 *              "description": "Préparation aigre-douce, à la texture de confiture, réalisée à partir de fruits ou de légumes cuits dans du vinaigre, avec du sucre et des épices."
 *          }
 *    }
 * 
 * @apiError error400 Bad input.
 * @apiError error03 Access forbidden.
 * 
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 400 Bad input
 *    {
 *      "error": "BadInput"
 *    }
 */
productRouter.route('/:id').patch(checkAccessToken, (req, res) => {
  if (!req.tokenData.admin) {
    res.status(403).json({ error: "Access forbidden." });
  }
  const patchData = req.body;
  console.log(patchData);
  

  Product.updateOne({_id: req.params.id}, {$set: patchData})
    .then(() => res.status(200).json('Product patched!'))
    .catch(err => res.status(400).json({ error: err }));
  
})


  module.exports = productRouter;
