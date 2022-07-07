const mongoose = require ('mongoose');

const PostSchema = new mongoose.Schema(
   {
   
    titre : {
        type: String,
        required: true,
        maxlength: 25
    },
    message : {
        type: String,
        trim: true,
        maxLength: 500
    },
    pictureUrl : {
        type: String,
        default: " "
    },
    likes : {
        type: Number,
        required: true,
        default: 0
    },
    usersLiked : {
        type: [String],
        required: true,
        default: []
    }
   },
   {
    timestamps: true
   }
);

module.exports = mongoose.model('post', PostSchema);