var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tagschema = new Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    long: {
        type: Number,
        required: true
    },
    sign: {
        type: String,
        default: ""
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Tag', tagschema);