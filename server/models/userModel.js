const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const Schema = mongoose.Schema

const shipping_location_schema = new Schema({
  name: { type: String },
  address: { type: String },
  department: { type: String },
  city: { type: String },
  postal_code: { type: String },
  comment: { type: String },
  country: { type: String }
})

const cart_schema = new Schema({
  product_id: { type: String },
  size: { type: String },
  quantity: { type: Number },
})

const checkout_schema = new Schema({
  cart: [cart_schema],
  shipping: shipping_location_schema
})

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  admin: { type: Boolean, required: true, default: false },
  password: { type: String, required: true },
  shipping_locations: [shipping_location_schema],
  checkout: checkout_schema,
  orders: { type: Array, of: String }
})

userSchema.statics.signup = async function(username, email, password){
  if(!email || !password || !username){ throw Error("All fields must be filled") }
  if(!validator.isEmail(email)){ throw Error("Email not valid") }
  if(!validator.isStrongPassword(password)){ throw Error("Password not strong enough") }

  const exists = await this.findOne({ email })
  if(exists){ throw Error("Email already in use") }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ username, email, password: hash })

  return user
}

userSchema.statics.login = async function(email, password){
  if(!email || !password){ throw Error("All fields must be filled") }

  const user = await this.findOne({ email })
  if(!user){ throw Error("Incorrect Email") }

  const match = await bcrypt.compare(password, user.password)
  if(!match){ throw Error("Incorrect Password") }

  return user
}

module.exports = mongoose.model("user", userSchema)
