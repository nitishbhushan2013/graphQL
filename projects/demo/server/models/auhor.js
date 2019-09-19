const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: String,
    country:String
    
})

module.export = mongoose.model('Author',authorSchema);