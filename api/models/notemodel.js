const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    contents: String
});

module.exports = mongoose.model('Note', noteSchema)