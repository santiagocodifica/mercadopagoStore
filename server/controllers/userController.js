const User =  require("../models/userModel")
const Order = require("../models/orderModel")
const Product = require("../models/productModel")
const jwt = require("jsonwebtoken")

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" })
}

const loginUser = async (req, res) => {
  const { email, password } = req.body

  try{
    const user = await User.login(email, password)
    const token = createToken(user._id)
    res.status(200).json({ username: user.username, email, token, id: user._id, admin: user.admin })
  }catch (error){
    res.status(400).json({ error: error.message })
  }
}

const signupUser = async(req, res) => {

  const { username, email, password } = req.body

  try{
    const user = await User.signup(username, email, password)
    const token = createToken(user._id)
    res.status(200).json({ username, email, token, admin: user.admin })
  }catch (error){
    console.log(error)
    res.status(400).json({ error: error.message }) 
  }
}

const createShippingLocation = async (req, res) => {

  const { shipping_location } = req.body
  const user_id = req.user._id

  const user = await User.findById(user_id)
  user.shipping_locations.push(shipping_location)
  const newLocation = user.shipping_locations[user.shipping_locations.length - 1]
  user.save( (err) => {
    if(err){ res.status(400).json({ error: err.message})}
    else{ res.status(200).json(newLocation) }
  })
} 

const getLocations = async (req, res) => {
  const user_id = req.user._id

  try{
    const user = await User.findOne({ _id: user_id}).select("shipping_locations")
    res.status(200).json(user.shipping_locations)
  }catch(error){
    console.log(error)
    res.status(400).json({ error: error.message })
  }
}

const deleteLocation = async (req, res) => {
  const { locationId } = req.params
  const user_id = req.user._id

  User.findOne({ _id: user_id}).select("shipping_locations")
    .then(user => {
      user.shipping_locations.id(locationId).remove()
      return user.save()
    })
    .then(user => res.status(200).json(user.shipping_locations))
    .catch(error => {
      console.log(error)
      res.status(400).json({ error: error.message })
    })
}

const createPayment = async (req, res) => {
  const { shippingLocation, cart } = req.body
  const user_id = req.user._id

  // find user
  User.findById(user_id)
    .then(async (user) => {
      if(user.checkout){
        user.checkout.remove()
        await user.save()
      }
      user.checkout = {
        cart: cart,
        shipping: shippingLocation
      }
      await user.save()
      res.status(200).json(user)
    })
    .catch(error => {
      console.log(error)
      res.status(400).json({ error: error.message })
    })
}

const getPaymentData = async (req, res) => {

  const user_id = req.user._id

  try{
    const user = await User.findById(user_id).select("checkout")
    let amount = 0

    const new_cart = await Promise.all(user.checkout.cart.map(async (item) => {
      try{
        const product = await Product.findById(item._id)
        amount += product.price * item.quantity
        return {
          ...product._doc,
          size: item.size,
          quantity: item.quantity
        }
      }catch(error){
        console.log(error)
        res.status(400).json({ error: error.message })
      }
    }))
    res.status(200).json({ cart: new_cart, shipping: user.checkout.shipping, total: amount })
  }catch(error){
    console.log(error)
    res.status(400).json({ error: error.message })
  }
}

const get_user_orders = async (req, res) => {
  const { id } = req.params

  try{
    const user = await User.findById(id)
    try{
      const orders = await Order.find({ "_id": { $in: user.orders }}).sort({ createdAt: -1 })
      res.status(200).json(orders)
    }catch(error){
      console.log(error)
      res.status(400).json({ error: error.message })
    }
  }catch(error){
    console.log(error)
    res.status(400).json({ error: error.message })
  }
}

module.exports = { loginUser, signupUser, createShippingLocation, getLocations, deleteLocation, createPayment, getPaymentData, get_user_orders }
