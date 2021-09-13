var mongoose    = require("mongoose");

mongoose.set('debug', true);
const Schema = mongoose.Schema;

var refreshTokenSchema = new mongoose.Schema(
    {
        token: { type: String,trim: true},
        userId: { type: Schema.Types.ObjectId, ref: 'User' }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("refreshToken", refreshTokenSchema);