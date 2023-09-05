const mongoose = require("mongoose")

const fruitSchema = mongoose.Schema(

    {
        id: { type: String, require: true },
        name: {type: String, require: true}

    }
)

module.exports = mongoose.model("fruit",fruitSchema)