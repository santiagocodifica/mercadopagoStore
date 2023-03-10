const mongoose = require("mongoose")

const Schema = mongoose.Schema

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  sizes: [{
    size: { type: String },
    stock: { type: Number }
  }],
  thumb: { type: Array, of: String },
  productImages: { type: Array, of: String }
})

module.exports = mongoose.model("product", productSchema)
