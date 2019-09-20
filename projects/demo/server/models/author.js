const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: String,
    country:String
    
});
module.exports = mongoose.model('Author',authorSchema);


