const mongoose = require("mongoose")

const Schema = mongoose.Schema

const user_schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  id: { type: mongoose.Types.ObjectId, required: true }
})

const order_schema = new Schema({
  mercadopago_data: { type: Object, required: true },
  user: user_schema,
  products: { type: Array, of: Object, required: true },
  total: { type: Number, required: true },
  shipping: { type: Object, required: true },
  status: { type: String, required: true },
  comments: { type: String, required: false}
},{ timestamps: true })

module.exports = mongoose.model("order", order_schema)
