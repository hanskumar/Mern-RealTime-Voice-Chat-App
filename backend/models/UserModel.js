var mongoose    = require("mongoose");
const validator = require('validator');

//const bcrypt = require('bcrypt');
mongoose.set('debug', true);

var UserSchema = new mongoose.Schema({
    password: { type: String,trim: true},
    name: {type: String,trim: true},
    phone: {type: String,trim: true},
    email: {type: String, trim: true},
    email_verified: {type: Boolean, default: false},
    role: { 
        type: String,
        enum: ['user','admin'],
        default: 'user'
    },
    avatar: {type: String,default: 'default.jpg'},
    resignation_date:  { type: Date,default: Date.now},
    login_by:   { type:String,default:''},
    status: { type:String,default:'active'},

    locations:[{
        cityId: { type: String,default: ''},
        districtId: {type: String,default: ''},
        lat:{ type: String,default: ''},
        long:{ type: String,default: ''},
        regionId: { type: String,default: ''},  
        subregionId:{ type: String,default: ''}
    }],

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    emailConfirmStatus: {
      type: Boolean,
      default: false,
    },
    emailConfirmToken: String,
    emailConfirmTokenExpires: Date,
    created_by:  String,
});

//password will be hashed beforre its saved
/* UserSchema.pre('save', async function (next) {
    try {

        var user = this;

        if (this.isNew) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(this.password, salt)
            this.password = hashedPassword
        }
        next()
    } catch (error) {
      next(error)
    }
})  */

/* UserSchema.methods.isPasswordMatch = async function(password) {
    try{
        return await bcrypt.compare(password, this.password)

    } catch (error){
        console.log(error);
        throw error
    }
} */

module.exports = mongoose.model("User", UserSchema);