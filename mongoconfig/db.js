import mongoose from "mongoose";
const uri = "mongodb+srv://mohsinkhanpixako:zSAEiacXJYypUEGh@cluster0.4xi6xe7.mongodb.net/?retryWrites=true&w=majority";


mongoose.connect(uri).then(()=>{
    console.log('Connected to MongoDB')
}).catch((err)=>{
    console.log('MongoDb is not connected')
    console.log(err.message)
});


