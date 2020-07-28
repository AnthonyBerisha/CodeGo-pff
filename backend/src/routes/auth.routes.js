const authRouter = require('express').Router();
let User = require('../models/user.model');
const serverSecret = process.env.SERVER_JWT_SECRET;
const checkAccessToken = require('../middleware/access.middleware');

const crypto = require('crypto');
var jwt = require('jsonwebtoken');


function createAccessToken(user) {
    return jwt.sign({
        userId: user._id,
        admin: user.admin
    }, serverSecret, { expiresIn: 30 * 60 });
}

// Create User
/**
 * @api {Post} /auth/register Register user
 * @apiName RegisterUser
 * @apiGroup User
 * 
 * @apiParam {String} FirstName Firstname of the user.
 * @apiParam {String} LastName Lastname of the user.
 * @apiParam {String} Email Unique. Email adress of the user, verified to match a regex. Needed to order and contact the seller.
 * @apiParam {String} Password Password affiliated with a unique email adress, verified and crypted.
 * @apiParam {String} Phone User's telephonic contact. has to match a 10 digit phone number.
 * @apiParam {Object} Address User's home location. Asked to prevent irresponsable orders (if the client has to drive 200km to get 2 potatoes).
 * @apiParam {String} NumberAndStreet Part of the user adress.
 * @apiParam {String} City Used to locate the user. Jardin Cabellio sells locally only.
 * @apiParam {String} Zip User's postal code.
 * 
 * @apiSuccess {String} FirstName Firstname of the user.
 * @apiSuccess {String} LastName Lastname of the user.
 * @apiSuccess {String} Email Unique. Email adress of the user, verified to match a regex. Needed to order and contact the seller.
 * @apiSuccess {String} Password Password affiliated with a unique email adress, verified and crypted.
 * @apiSuccess {Boolean} Admin Access level of the user. The admin has no limit. 
 * @apiSuccess {String} Phone User's telephonic contact. has to match a 10 digit phone number.
 * @apiSuccess {Object} Address User's home location. Asked to prevent irresponsable orders (if the client has to drive 200km to get 2 potatoes).
 * @apiSuccess {String} NumberAndStreet Part of the user adress.
 * @apiSuccess {String} City Used to locate the user. Jardin Cabellio sells locally only.
 * @apiSuccess {String} Zip User's postal code.
 * @apiSuccess {String} Token Token (access and refresh). Used to identify the user.
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 User successfully registered
 *     {
 *       "tokens": {
 *           "accessToken": "(string_jwt)",
 *           "refresh()": "(random_string)"
 *        }
 *     }
 * 
 * @apiError error400 Bad request.
 * @apiError error401 Email already exists.
 * 
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 401 Email Already Taken
 *    {
 *      "error": "EmailAlreadyTaken"
 *    }
 */
authRouter.route('/register').post((req, res) => {
    const data = req.body ;
  
    const newUser = new User({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        address: {
          zip: data.address.zip,
          numberAndStreet: data.address.numberAndStreet,
          city: data.address.city
        },
        refreshToken: crypto.randomBytes(16).toString('hex')
    });

    console.log(newUser);

    newUser.save()
    .then((user) => {
      user.admin = false;
      const accessToken = createAccessToken(user);
      res.status(201).json({
        tokens: {
          accessToken,
          refreshToken: user.refreshToken
        },
        userId: user._id
      });
    })
    .catch(err => {
      console.log(err);
      if (err.code && err.code === 11000) {
        res.status(401).json({ error: err.message });
      } else {
        res.status(400).json({ error: err.message });
      }
    });
});

/**
 * @api {Post} /auth/login Login user
 * @apiName LoginUser
 * @apiGroup User
 * 
 * @apiParam {String} Email Unique. Email adress of the user, verified to match a regex. Needed to order and contact the seller.
 * @apiParam {String} Password Password affiliated with a unique email adress, verified and crypted.
 * 
 * @apiSuccess {String} Email Unique. Email adress of the user, verified to match a regex. Needed to order and contact the seller.
 * @apiSuccess {String} Password Password affiliated with a unique email adress, verified and crypted.
 * @apiSuccess {Boolean} Admin Access level of the user. The admin has no limit. 
 * @apiSuccess {String} Token Token (access and refresh). Used to identify the user.
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 User successfully connected
 *     {
 *       "tokens": {
 *           "accessToken": "(string_jwt)",
 *           "refresh()": "(random_string)"
 *        }
 *     }
 * 
 * @apiError error401 Email not found. / Password and email do not match.
 * @apiError error500 Internal server error.
 * 
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 401 Email not found
 *    {
 *      "error": "EmailNotFound"
 *    }
 */
authRouter.route('/login').post((req, res) => {
  User.findOne({ email: req.body.email })
    .select('password email firstName lastName refreshToken admin')
    .then(user => {
      if (user === null) {
        res.status(401).json({ error: 'Email not found.' });
      }
      user.comparePasswords(req.body.password, function(err, isMatch) {
        if (err) res.status(500).json({ error: err.message });
        if (isMatch) {
          const accessToken = createAccessToken(user);
          const data = {
            tokens: {
              accessToken,
              refreshToken: user.refreshToken
            }
          }
          if (user.admin === true) data.admin = true;
          res.status(200).json(data);
        } else {
          res.status(401).json({ error: 'Password and email do not match.' })
        }
      });
    })
})

/**
 * @api {Post} /auth/token Refresh token
 * @apiName RefreshToken
 * @apiGroup User
 * 
 * @apiParam {String} AccessToken Used to identify the user.
 *
 * @apiSuccess {String} RefreshToken Used to identify the user. Randomized again.
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 OK
 *    {
 *      "token": {
 *          "refresh()": "(random_string)"
 *       }
 *    }
 * 
 * @apiError error401 Invalid token.
 * 
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 401 Email not found
 *    {
 *      "error": "InvalidToken"
 *    }
 */
authRouter.route('/token').post((req, res) => {
	try {
		const refreshToken = req.body.token;
		User.findOne({ refreshToken: refreshToken })
		    .select('email firstName lastName refreshToken')
		    .then(user => {
		    	if (user === null) {
		    		res.status(401).json({ error: 'Invalid token.' })
		    	} else {
		    		const accessToken = createAccessToken(user);
		    		// refreshToken can be randomized again if needed
		    		// for now, it's just resent to client
		    		res.status(201).json({
		    			tokens: {
		    				accessToken,
		    				refreshToken: user.refreshToken
		    			},
		    			userId: user._id
		    		});
		    	}
		    })
		    .catch(error => {
		    	console.log(error)
		    })
	} catch(err) {
		console.log(err);
	}
})

/**
 * @api {Get} /auth Return user information
 * @apiName GetCurrentUserInformation
 * @apiGroup User
 * 
 * @apiParam {String} AccessToken Used to retrieve the user.
 *
 * @apiSuccess {Object} User The user and all its data.
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 201 OK
 *    {
 *      "user": {
 *          "id": "(random_string)",
 *          "firstname": "Jack",
 *          "lastname": "Sparrow",
 *          "email": "Jack.Sparrow@Captain.com",
 *          "password": "(hashed_string)",
 *          "admin": "false",
 *          "adress": {
 *              "numberAndStreet": "2 rue du gros bateau",
 *              "city": "Tortuga",
 *              "zip": "75012"         
 *          }
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
authRouter.route('/').get(checkAccessToken, (req, res) => {

    User.findById(req.tokenData.userId)
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json({ error: err.message }));
      });

// Update user
/**
 * @api {Put} /auth Update user informations
 * @apiName UpdateUser
 * @apiGroup User
 * 
 * @apiParam {String} FirstName Firstname of the user.
 * @apiParam {String} LastName Lastname of the user.
 * @apiParam {String} Email Unique. Email adress of the user, verified to match a regex. Needed to order and contact the seller.
 * @apiParam {String} Password Password affiliated with a unique email adress, verified and crypted.
 * @apiParam {String} Phone User's telephonic contact. has to match a 10 digit phone number.
 * @apiParam {Object} Address User's home location. Asked to prevent irresponsable orders (if the client has to drive 200km to get 2 potatoes).
 * @apiParam {String} NumberAndStreet Part of the user adress.
 * @apiParam {String} City Used to locate the user. Jardin Cabellio sells locally only.
 * @apiParam {String} Zip User's postal code.
 * @apiParam {String} Token Token (access and refresh). Used to identify the user.
 * 
 * @apiSuccess {String} FirstName Firstname of the user.
 * @apiSuccess {String} LastName Lastname of the user.
 * @apiSuccess {String} Email Unique. Email adress of the user, verified to match a regex. Needed to order and contact the seller.
 * @apiSuccess {String} Phone User's telephonic contact. has to match a 10 digit phone number.
 * @apiSuccess {Object} Address User's home location. Asked to prevent irresponsable orders (if the client has to drive 200km to get 2 potatoes).
 * @apiSuccess {String} NumberAndStreet Part of the user adress.
 * @apiSuccess {String} City Used to locate the user. Jardin Cabellio sells locally only.
 * @apiSuccess {String} Zip User's postal code.
 * @apiSuccess {String} Token Token (access and refresh). Used to identify the user.
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 User successfully updated
 *     {
 *        "id": "(random_string)",
 *        "firstname": "Jack",
 *        "lastname": "Sparrow",
 *        "email": "Jack.Sparrow@Captain.com",
 *        "adress": {
 *            "numberAndStreet": "2 rue du gros bateau",
 *            "city": "Tortuga",
 *            "zip": "75012"         
 *        },
 *        "tokens": {
 *            "accessToken": "(string_jwt)",
 *            "refresh()": "(random_string)"
 *        }
 *     }
 * 
 * @apiError error400 Email duplicate error.
 * @apiError error404 User not found.
 * @apiError error500 Internal server error.
 * 
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 400 Email Already Taken
 *    {
 *      "error": "EmailDuplicateError"
 *    }
 */
authRouter.route('/').put(checkAccessToken, (req, res) => {
    const data = req.body ; 

    User.findById(req.tokenData.userId)
      .select("firstName lastName email phone address admin")
      .then(user => {
        // console.log(data);
        if (user === null) {
          res.status(404).json({ error: 'User not found.' })
        } else if (data.firstName && data.lastName && data.email && data.phone && data.address) {
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.email = data.email;
            user.phone = data.phone;
            user.address = {
                zip : data.address.zip,
                numberAndStreet: data.address.numberAndStreet,
                city: data.address.city
            };
          } else if (data.password) {
            user.password = data.password;
          };

  
          user.save()
            .then(user => {
              // console.log('data:' + user);
              const accessToken = createAccessToken(user);
              res.status(200).json({
                tokens: {
                  accessToken,
                  refreshToken: user.refreshToken
                },
                userId: user._id
              });
            })
            .catch(err => {
              console.log(err);
              if(err.code === 11000) {
                res.status(400).json({error: 'EmailDuplicateError'})
              }else{
                res.status(400).json({ error: err.message })
              }
            });
        }
      )
      .catch(err => res.status(500).json({ error: err.message }));
  });


// Delete user 
/**
 * @api {delete} /auth Delete user
 * @apiName DeleteCurrentUserInformation
 * @apiGroup User
 * 
 * @apiParam {String} Token Associated token to find the user.
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 User deleted
 * 
 * @apiError error404 User not found.
 * @apiError error500 Internal server error.
 * 
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 500 Internal server error
 *    {
 *      "error": "InternalServerError"
 *    }
 */
authRouter.route('/').delete(checkAccessToken, (req, res) => {

    User.findOneAndDelete({ _id: req.tokenData.userId })
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


module.exports = authRouter;