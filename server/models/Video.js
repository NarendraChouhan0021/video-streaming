const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    // _id: {
    //     type: mongoose.Schema.Types.ObjectId,
    // },
    fileName: {
        type:String,
        maxlength: 50 
    },
    filePath : {
        type: String
    },
    duration: {
        type: String
    },
    thumbnail: {
        type: String
    }
}, {timestamps: true})

const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }