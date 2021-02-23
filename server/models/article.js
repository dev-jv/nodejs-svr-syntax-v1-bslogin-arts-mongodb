const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    artName: {
        type: String,
        required: [true, 'Article name is required']
    },
    artAut: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    artContent: {
        type: String,
        required: [true, 'A content is required'],
    },
    imag: {
        type: [],
        required: [true, 'Image required']
    }
});

module.exports = mongoose.model('Article', articleSchema); // The colecction name would be... articles!!!
