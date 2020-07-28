const orderRouter = require('express').Router();
let Order = require('../models/order.model');
const checkAccessToken = require('../middleware/access.middleware');

/**
 * @api {Get} /order/all Return all orders. Admin usage
 * @apiName GetAllOrdersAsAdmin
 * @apiGroup Order
 * 
 * @apiParam {Boolean} Admin State the access level of the user.
 * @apiParam {Object} Product Product ordered by the customer.
 * @apiParam {Object} User Used to associate an order to a customer.
 *
 * @apiSuccess {Object} Order All orders from all users.
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "order": {
 *          "id": "(random_string)",
 *          "date": "01/01/2010",
 *          "price": "420",
 *          "status": "En préparation",
 *          "user": {
 *             "id": "(random_string)",
 *             "firstname": "Jack",
 *             "lastname": "Sparrow",
 *             "email": "Jack.Sparrow@Captain.com",
 *             "password": "hashed_string",
 *             "admin": "false",
 *             "adress": {
 *                 "numberAndStreet": "2 rue du gros bateau",
 *                 "city": "Tortuga",
 *                 "zip": "75012"         
 *             }       
 *          },
 *          "product": {
 *              "id": "(random_string)",
 *              "name": "Chutney de mangue",
 *              "description": "Un truc plutot pas mal",
 *              "price": "5.49",
 *              "image":"(url)",
 *              "inStock": "false",
 *              "favorites": "false",
 *              "category": {
 *                  "title": "chutney",
 *                  "description": "Préparation aigre-douce, à la texture de confiture, réalisée à partir de fruits ou de légumes cuits dans du vinaigre, avec du sucre et des épices."
 *              }
 *          },
 *          "itemsCount": {
 *              "_id": "(productId)",
 *              "count": "2"
 *          }
 *    }
 * 
 * @apiError error403 Admin privileges requested.
 * @apiError error500 Internal server error.
 * 
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 403 Admin privileges
 *    {
 *      "error": "AdminPrivileges"
 *    }
 */
orderRouter.route('/all').get(checkAccessToken, (req, res) => {
  if (!req.tokenData.admin) {
    res.status(403).json("AdminPrivileges");
  }
    Order.find()
      .populate('products')
      .populate('userId')
      .then(orders => res.status(200).json(orders))
      .catch(err => res.status(500).json('Error: ' + err));
});

/**
 * @api {Get} /order Return all orders. User usage
 * @apiName GetAllOrdersAsUser
 * @apiGroup Order
 * 
 * @apiParam {String} Token Identification of user.
 *
 * @apiSuccess {Object} Order All orders from one user.
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "order": {
 *          "id": "(random_string)",
 *          "date": "01/01/2010",
 *          "price": "420",
 *          "status": "En préparation",
 *          "product": {
 *              "id": "(random_string)",
 *              "name": "Chutney de mangue",
 *              "description": "Un truc plutot pas mal",
 *              "price": "5.49",
 *              "image":"(url)",
 *              "inStock": "false",
 *              "favorites": "false",
 *              "category": {
 *                  "id": "(random_string)",
 *                  "title": "chutney",
 *                  "description": "Préparation aigre-douce, à la texture de confiture, réalisée à partir de fruits ou de légumes cuits dans du vinaigre, avec du sucre et des épices."
 *              }
 *          },
 *          "itemsCount": {
 *              "_id": "(productId)",
 *              "count": "2"
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
orderRouter.route('/').get(checkAccessToken, (req, res) => {
  const userId = req.tokenData.userId;
  Order.find({userId: userId})
    .populate('products')
    .populate('userId')
    .then(orders => res.status(200).json(orders))
    .catch(err => res.status(500).json('Error: ' + err));
});


/**
 * @api {Post} /order Create order
 * @apiName CreateOrder
 * @apiGroup Order
 * 
 * @apiParam {String} AccessToken Checks user identification, if the user is connected.
 * @apiParam {Object} Order Order to be created.
 *
 * @apiSuccess {Object} Order Order created.
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 Order added
 *    {
 *      "order": {
 *          "id": "(random_string)",
 *          "date": "01/01/2010",
 *          "price": "420",
 *          "status": "En préparation",
 *          "product": {
 *              "id": "(random_string)",
 *              "name": "Chutney de mangue",
 *              "description": "Un truc plutot pas mal",
 *              "price": "5.49",
 *              "image":"(url)",
 *              "inStock": "false",
 *              "favorites": "false",
 *              "category": {
 *                  "id": "(random_string)",
 *                  "title": "chutney",
 *                  "description": "Préparation aigre-douce, à la texture de confiture, réalisée à partir de fruits ou de légumes cuits dans du vinaigre, avec du sucre et des épices."
 *              }
 *          },
 *          "itemsCount": {
 *              "_id": "(productId)",
 *              "count": "2"
 *          },
 *          "user": {
 *             "id": "(random_string)",
 *             "firstname": "Jack",
 *             "lastname": "Sparrow",
 *             "email": "Jack.Sparrow@Captain.com",
 *             "password": "hashed_string",
 *             "admin": "false",
 *             "adress": {
 *                 "numberAndStreet": "2 rue du gros bateau",
 *                 "city": "Tortuga",
 *                 "zip": "75012"         
 *             }       
 *          }
 *    }
 * 
 * @apiError error400 Bad input
 * 
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 400 Bad input
 *    {
 *      "error": "BadInput"
 *    }
 */
orderRouter.route('/').post(checkAccessToken, (req, res) => {
  //   Check if req.body.userId is set
  const price = req.body.price;
  const status = "Enregistrée";
  const products = req.body.products;
  const itemsCount = req.body.itemsCount;
  const date = new Date();
  
  // Connect Client with back by sending the current userId in the request
  // In the future the userId might be in the access token, might need to decrypt  
  // const userId = req.body.userId;
  const userId = req.tokenData.userId;
  console.error(userId);
  
//   const userId = '5e319dbba4a44e36a150492c';
  const newOrder = new Order({
	  price,
	  status,
    products,
    itemsCount,
	  date,
	  userId
  });

  newOrder.save()
  .then(() => res.status(201).json('Order added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * @api {Get} /order/:orderId Return one order. User usage
 * @apiName GetOneOrderById
 * @apiGroup Order
 * 
 * @apiParam {Object} OrderId Allow order identification.
 *
 * @apiSuccess {Object} Order All orders from one user.
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "order": {
 *          "id": "(random_string)",
 *          "date": "01/01/2010",
 *          "price": "420",
 *          "status": "En préparation",
 *          "product": {
 *              "id": "(random_string)",
 *              "name": "Chutney de mangue",
 *              "description": "Un truc plutot pas mal",
 *              "price": "5.49",
 *              "image":"(url)",
 *              "inStock": "false",
 *              "favorites": "false",
 *              "category": {
 *                  "id": "(random_string)",
 *                  "title": "chutney",
 *                  "description": "Préparation aigre-douce, à la texture de confiture, réalisée à partir de fruits ou de légumes cuits dans du vinaigre, avec du sucre et des épices."
 *              }
 *          },
 *          "itemsCount": {
 *              "_id": "(productId)",
 *              "count": "2"
 *          }
 *    }
 * 
 * @apiError error404 Order not found.
 * @apiError error500 Internal server error.
 * 
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 404 Order not found
 *    {
 *      "error": "OrderNotFound"
 *    }
 */
orderRouter.route('/:orderId').get(checkAccessToken, (req, res) => {
  Order.findById(req.params.orderId)
    .then(result => {
    // console.log(result);
      if (result === null) {
        res.status(404).json('Order not found.')
      } else {
      res.status(200).json(result)
      }
    })
    .catch(err => {
      res.status(500).json('Error: ' + err)
    })
});

/**
 * @api {Patch} /order/:id To patch one order information. Admin usage
 * @apiName PatchOrderInformation
 * @apiGroup Order
 * 
 * @apiParam {ObjectId} _id Unique. Used to retrieve orders.
 *
 * @apiSuccess {Object} Order Order and all its data.
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 Order patched
 *    {
 *      "order": {
 *          "id": "(random_string)",
 *          "date": "01/01/2010",
 *          "price": "420",
 *          "status": "En préparation",
 *          "product": {
 *              "id": "(random_string)",
 *              "name": "Chutney de mangue",
 *              "description": "Un truc plutot pas mal",
 *              "price": "5.49",
 *              "image":"(url)",
 *              "inStock": "false",
 *              "favorites": "false",
 *              "category": {
 *                  "id": "(random_string)",
 *                  "title": "chutney",
 *                  "description": "Préparation aigre-douce, à la texture de confiture, réalisée à partir de fruits ou de légumes cuits dans du vinaigre, avec du sucre et des épices."
 *              }
 *          },
 *          "itemsCount": {
 *              "_id": "(productId)",
 *              "count": "2"
 *          },
 *          "user": {
 *             "id": "(random_string)",
 *             "firstname": "Jack",
 *             "lastname": "Sparrow",
 *             "email": "Jack.Sparrow@Captain.com",
 *             "password": "hashed_string",
 *             "admin": "false",
 *             "adress": {
 *                 "numberAndStreet": "2 rue du gros bateau",
 *                 "city": "Tortuga",
 *                 "zip": "75012"         
 *             }       
 *          }
 *    }
 * 
 * @apiError error400 Bad input.
 * @apiError error403 Access forbidden.
 * 
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 400 Bad input
 *    {
 *      "error": "BadInput"
 *    }
 */
orderRouter.route('/:id').patch(checkAccessToken, (req, res) => {
  if (!req.tokenData.admin) {
    res.status(403).json("Access forbidden");
  }
  const patchData = req.body;
  console.log(patchData);
  Order.updateOne({_id: req.params.id}, {$set: patchData})
    .then(() => res.status(200).json('Order patched!'))
    .catch(err => res.status(400).json({ error: err }));
});

/**
 * @api {Delete} /order/:orderId Delete one order
 * @apiName DeleteOneOrderById
 * @apiGroup Order
 * 
 * @apiParam {Object} OrderId allow order identification.
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 Order deleted
 * 
 * @apiError error404 Order not found.
 * @apiError error500 Internal server error.
 * 
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 404 Order not found
 *    {
 *      "error": "OrderNotFound"
 *    }
 */
orderRouter.route('/:orderId').delete((req, res) => {
  Order.findByIdAndDelete(req.params.orderId)
    .then(result => {
      // console.log(result);
      if (result === null) {
        res.status(404).json('Order not found.')
      } else {
      res.status(200).json('Order deleted.')
      }
    })
    .catch(err => {
        res.status(500).json('Error: ' + err)
    })
});

/**
 * @api {Put} /order/:orderId Update order
 * @apiName UpdateOneOrderById
 * @apiGroup Order
 * 
 * @apiParam {String} AccessToken Checks user identification.
 * @apiParam {Object} OrderId Allow order identification.
 * @apiParam {Object} Order Order to be updated.
 *
 * @apiSuccess {Object} Order Order updated.
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 Order updated
 *    {
 *      "order": {
 *          "id": "(random_string)",
 *          "price": "420",
 *          "status": "En préparation",
 *          "product": {
 *              "id": "(random_string)",
 *              "name": "Chutney de mangue",
 *              "description": "Un truc plutot pas mal",
 *              "price": "5.49",
 *              "image":"(url)",
 *              "inStock": "false",
 *              "favorites": "false",
 *              "category": {
 *                  "id": "(random_string)",
 *                  "title": "chutney",
 *                  "description": "Préparation aigre-douce, à la texture de confiture, réalisée à partir de fruits ou de légumes cuits dans du vinaigre, avec du sucre et des épices."
 *              }
 *          },
 *          "itemsCount": {
 *              "_id": "(productId)",
 *              "count": "2"
 *          }
 *    }
 * 
 * @apiError error404 Order not found.
 * @apiError error500 Internal server error.
 * 
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 404 Order not found
 *    {
 *      "error": "OrderNotFound"
 *    }
 */
orderRouter.route('/:orderId').put(checkAccessToken, (req, res) => {
  Order.findById(req.params.orderId)
    .then(order => {
      if (order === null) {
        res.status(404).json('Order not found.')
      } else {
        order.price = req.body.price;
        order.status = req.body.status;
        order.products = req.body.products;

        order.save()
          .then(() => res.status(200).json('Order updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      }
    })
    .catch(err => res.status(500).json('Error: ' + err));
})




  module.exports = orderRouter;