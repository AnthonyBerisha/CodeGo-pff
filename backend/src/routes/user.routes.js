const userRouter = require('express').Router();
let User = require('../models/user.model');
const checkAccessToken = require('../middleware/access.middleware');


/**
 * @api {Get} /user Return all users/one user information(s). Admin usage
 * @apiName GetUserInformation
 * @apiGroup User
 * 
 * @apiParam {String} Email Unique. Used to retrieve users.
 *
 * @apiSuccess {Object} User All users and all user's datas (except status & password).
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "user": {
 *          "id": "(random_string)",
 *          "firstname": "Jack",
 *          "lastname": "Sparrow",
 *          "email": "Jack.Sparrow@Captain.com",
 *          "admin": "false"
 *          "adress": {
 *              "numberAndStreet": "2 rue du gros bateau",
 *              "city": "Tortuga",
 *              "zip": "75012"         
 *          }
 *       }
 *    }
 * 
 * @apiError error403 Access forbidden.
 * @apiError error500 Internal server error.
 * 
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 403 Access forbidden
 *    {
 *      "error": "AccessForbidden"
 *    }
 */
userRouter.route('/').get(checkAccessToken, (req, res) => {
  if (!req.tokenData.admin) {
    res.status(403).json({ error: "Access forbidden." });
  }
  if(req.body.email){

    User.findOne({email: req.body.email})
      .then(user => res.status(200).json(user))
      .catch(err => res.status(500).json({ error: err.message }));
  }
  else {
    User.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({error: err.message}));
  }
  });

/**
 * @api {Patch} /user/:id To patch one user information. Admin usage
 * @apiName PatchUserInformation
 * @apiGroup User
 * 
 * @apiParam {ObjectId} _id Unique. Used to retrieve users.
 *
 * @apiSuccess {Object} User User and all its data (except password).
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 User patched
 *    {
 *      "user": {
 *          "id": "(random_string)",
 *          "firstname": "Jack",
 *          "lastname": "Sparrow",
 *          "email": "Jack.Sparrow@Captain.com",
 *          "phone": "06 23 45 67 89"
 *          "adress": {
 *              "numberAndStreet": "2 rue du gros bateau",
 *              "city": "Tortuga",
 *              "zip": "75012"         
 *          }
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
userRouter.route('/:id').patch(checkAccessToken, (req, res) => {
  if (!req.tokenData.admin) {
    res.status(403).json({ error: "Access forbidden." });
  }
  const patchData = req.body;
  console.log(patchData);
  User.updateOne({_id: req.params.id}, {$set: patchData})
    .then(() => res.status(200).json('User patched!'))
    .catch(err => res.status(400).json({ error: err }));
  
})

// Update user
/**
 * @api {Put} /user To update user informations
 * @apiName UpdatelUserInformation
 * @apiGroup User
 * 
 * @apiParam {String} Email Unique. Used to retrieve users.
 *
 * @apiSuccess {Object} User All users and all user's datas (except status & password).
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 User successfulle updated
 *    {
 *      "user": {
 *          "id": "(random_string)",
 *          "firstname": "Jack",
 *          "lastname": "Sparrow",
 *          "email": "Jack.Sparrow@Captain.com",
 *          "password": "(hashed_password)"
 *          "phone": "06 23 45 67 89"
 *          "adress": {
 *              "numberAndStreet": "2 rue du gros bateau",
 *              "city": "Tortuga",
 *              "zip": "75012"         
 *          }
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
userRouter.route('/').put((req, res) => {
    const data = req.body ; 

    User.findOne({email: req.body.email})
      .select("firstName lastName email phone address admin tokenSecret")
      .then(user => {
        if (user === null) {
          res.status(404).json({ error: 'User not found.' })
        } else {
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.email = data.email;
            user.phone = data.phone;
            user.address = {
                zip : data.address.zip,
                numberAndStreet: data.address.numberAndStreet,
                city: data.address.city
            };
            if (data.password) user.password = data.password;
  
          user.save()
            .then(user => {
              res.status(200).json({ message: 'User successfully updated' });
            })
            .catch(err => res.status(400).json({ error: err.message }));
        }
      })
      .catch(err => res.status(500).json({ error: err.message }));
  });

// Delete user
/**
 * @api {Delete} /user/:userId Delete user. Admin usage
 * @apiName DeleteUser
 * @apiGroup User
 * 
 * @apiParam {ObjectId} _Id Unique. Used to retrieve users for deletion.
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 User deleted
 * 
 * @apiError error403 Access forbidden.
 * @apiError error404 User not found.
 * @apiError error500 Internal server error.
 * 
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 404 User not found
 *    {
 *      "error": "UserNotFound"
 *    }
 */
userRouter.route('/:userId').delete((req, res) => {
    User.findOneAndDelete({_id: req.params.userId})
      .then(result => {
        if (result === null) {
          res.status(404).json({ error: 'User not found.' })
        } else {
            res.status(200).json({ message: 'User deleted.' })
        }
      })
      .catch(err => {
          res.status(500).json({ error: err.message });
      })
  });


//   userRouter.route('/').delete(checkAccessToken, (req, res) => {
//     if (!req.tokenData.admin) {
//       res.status(403).json({ error: "Access forbidden." });
//     }
//     User.findOne({email: req.body.email})
// });

module.exports = userRouter;