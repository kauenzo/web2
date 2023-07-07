const mongoose = require("mongoose");

async function main() {
    try {

        mongoose.set("strictQuery", true)
        await mongoose.connect("mongodb+srv://yupaulo7:b6qMX2fPx2InES5Z@cluster0.g7ki6nh.mongodb.net/trabalho?retryWrites=true&w=majority");
    } catch (error) {
        console.log(`Erro: ${error}`);
    }
}

module.exports = main;