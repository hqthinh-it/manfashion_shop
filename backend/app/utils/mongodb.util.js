// const { MongoClient } = require("mongodb");
const { mongoose } = require("mongoose");


async function connect(uri) {
    await mongoose.connect(uri).then(res => {
        console.log("Connect database successfully!")
    }).catch(error => {
        console.log(error);
    })
}
module.exports = { connect };

