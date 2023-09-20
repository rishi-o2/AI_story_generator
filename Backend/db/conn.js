const mongoose= require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/story-api", {useNewUrlParser:true, useUnifiedTopology:true, serverSelectionTimeoutMS: 30000,socketTimeoutMS: 45000, }).then( ()=> console.log("connection successfull....."))
.catch((err) => console.log(err));