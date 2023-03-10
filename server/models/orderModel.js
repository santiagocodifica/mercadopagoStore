const mongoose = require("mongoose")

const Schema = mongoose.Schema

const order_schema = new Schema({
  order_data: { type: Object, required: true },
  user: { type: Object, required: true },
  products: { type: Array, of: Object, required: true },
  total: { type: Number, required: true },
  shipping: { type: Object, required: true },
  status: { type: String, required: true }
},{ timestamps: true })

module.exports = mongoose.model("order", order_schema)
