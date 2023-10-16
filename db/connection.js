const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/restful2",
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> {console.log("db connection successful ")})
.catch((err)=> {console.log(err)});