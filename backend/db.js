const mongoose = require('mongoose');
const mongoURI = "mongodb://samarpit:Sneh%40123great@ac-ky2fku8-shard-00-00.mkpn2fr.mongodb.net:27017,ac-ky2fku8-shard-00-01.mkpn2fr.mongodb.net:27017,ac-ky2fku8-shard-00-02.mkpn2fr.mongodb.net:27017/orderapp?ssl=true&replicaSet=atlas-yzrfip-shard-0&authSource=admin&retryWrites=true&w=majority";

const mongoDB = async() => {
   await mongoose.connect(mongoURI,{
        useNewUrlParser: true
    },async (err,result) => {
        if(err) console.log("----",err)
        else{
        console.log("DB CONNECTED")
        const fetched_data = await mongoose.connection.db.collection("items");
        fetched_data.find({}).toArray( function(err,data){
            if(err) console.log(err);
                else{
                    global.items = data;
                    console.log(global.items)
                }
        })
        }
    });
}

module.exports = mongoDB;