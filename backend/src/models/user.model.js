const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

/**
 * @api {Schema} User Schema, stating users properties
 * @apiName UserSchema
 * @apiGroup User
 * 
 * @apiParam {String} FirstName Firstname of the user.
 * @apiParam {String} LastName Lastname of the user.
 * @apiParam {String} Email Unique. Email adress of the user, verified to match a regex. Needed to order and contact the seller.
 * @apiParam {String} Password Password affiliated with a unique email adress, verified and crypted.
 * @apiParam {Boolean} Admin Access level of the user. The admin has no limit. 
 * @apiParam {String} Phone User's telephonic contact. has to match a 10 digit phone number.
 * @apiParam {Object} Address User's home location. Asked to prevent irresponsable orders (if the client has to drive 200km to get 2 potatoes).
 * @apiParam {String} NumberAndStreet Part of the user adress.
 * @apiParam {String} City Used to locate the user. Jardin Cabellio sells locally only.
 * @apiParam {String} Zip User's postal code.
 * @apiParam {String} RefreshToken Used to identify the user.
 */
const userSchema = new Schema({
    firstName:{
        type:String,
        required: [true, 'firstname is required'],
        trim: true
    },
    lastName:{
        type:String,
        required: [true, 'lastname is required'],
        trim: true
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        unique: [true, 'DuplicateEmailError'],
        required: [true,'Email address is required'],
        validate: {
            validator: function(m){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(m);
            },
            message: email => "Veuillez entrer une adresse email valide."
        }
    
    },
    password:{
        type:String,
        minlength: 6,
        maxlength: 16,
        select: false
    },
     admin:{
         type: Boolean,
         default: false 

     },
     phone:{
        type: String,
        trim:true,
        required: true, 
        validate: {
            // phone verification: the first 2 numbers must be 07-06 (Local client)
            validator: function(v){
                return /^0[6-7]\d{8}$/.test(v);
            },
            message:'{VALUE} is not a phone number!'
        }
     },
     address:{
        numberAndStreet:{
            type: String,
            required: true,
            trim: true
        },
        city:{
            type: String,
            required: true
        },
        //  for invoice purposes therefore no further verification is necessary (Client responsability) 
        zip:{
            type: String, 
            required: true,
            validate: {
                // zip code verification: numbers only
                validator: function(z){
                    return /^\d{5}$/.test(z);
                }
            }
            
        }
     },
     refreshToken:{
        type:String,
        required:true,
        select: false
     }
})
userSchema.pre('save', function(next) {

    let user = this;
    if(!user.password) return next()

    // Generate salt
    bcrypt.genSalt(10, (err, salt) => {

        if(err) return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {

            if(err) return next(err);
            // Override plain text password with hashed one
            user.password = hash;
            next();
        })
    })

})

userSchema.methods.comparePasswords = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}

const User = mongoose.model('User', userSchema);
module.exports = User;
