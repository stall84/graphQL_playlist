const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const bookSchema = new Schema({
    name: String,
    genre: String,
    authorID: String
})




// Create a new collection 'Book' which is mapped to the schema we created above
module.exports = mongoose.model('Book', bookSchema);                            