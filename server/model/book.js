const mongoose = require('mongoose')
const schema = mongoose.Schema;


const bookSchema = new schema({
    name:{
        type:String
    },
    genre:{
        type:String
    },
    author_id:{
        type:String
    }
});


module.exports = mongoose.model('Book',bookSchema)