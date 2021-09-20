var mongoose    = require("mongoose");
const validator = require('validator');

//const bcrypt = require('bcrypt');
mongoose.set('debug', true);

var UserSchema = new mongoose.Schema({
        name: {type: String,trim: true},
        password: { type: String,trim: true},
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
        isActivated: { type: Boolean, required: false, default: false },
    },
    {
        timestamps: true,
        //toJSON: { getters: true },
    }
);
module.exports = mongoose.model("User", UserSchema);