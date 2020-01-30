const mongoose = require('mongoose');
const schema = mongoose.Schema

const authorSchema = new schema({

    name:{
        type:String,
    },
    age:{
        type:Number,
    }
});

module.exports = mongoose.model('Author',authorSchema)