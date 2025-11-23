const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{console.log("DB connected")})
    .catch((err)=>{console.log("error",err)});
}

module.exports = connectDB;