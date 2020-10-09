const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const authorSchema = new Schema({
    name: String,
    age: Number
})




// Create a new collection 'Author' which is mapped to the schema we created above
module.exports = mongoose.model('Author', authorSchema);                            