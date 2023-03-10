const mongoose = require("mongoose")
const Order = require("../models/orderModel")
const User = require("../models/userModel")

const get_orders = (_req, res) => {
  Order.find({}).sort({ createdAt: -1 })
    .then(orders => { res.status(200).json(orders) })
    .catch(error => {
      console.log(error)
      res.status(400).json({ error: error.message })
    })
}

const get_order = (req, res) => {
  const { id } = req.params
  Order.findById(id)
    .then(order => res.status(200).json(order))
    .catch(error => {
      console.log(error)
      res.status(400).json({ error: error.message })
    })
}

const get_orders_by_status= (req, res) => {
  const { status } = req.params
  Order.find({ status: status }).sort({ createdAt: -1 })
    .then(orders => res.status(200).json(orders))
    .catch(error => {
      console.log(error)
      res.status(400).json({ error: error.message })
    })
} 

const create_order = async (req, res) => {
  Order.create({
    order_data: req.mercadopagoResponse,
    user: req.body.user,
    products: req.body.products,
    total: req.body.total,
    shipping: req.body.shipping,
    status: "ordered"
  })
    .then(order => {
      User.findById(req.user._id)
        .then(user => {
          console.log("finds user: ", user)
          user.orders.push(order._id)
          user.checkout = {}
          const save = user.save()
          if(save){
            res.status(200).json(order)
          }else{
            res.status(400).json({ error: "There was a problem processing your order, please contact us" })
          }
        })
        .catch(error => {
          console.log(error)
          res.status(400).json({ error: "There was a problem processing your order, please contact us" })
        })
    })
    .catch(error => {
      console.log(error)
      res.status(400).json({ error: "There was a problem processing your order, please contact us"})
    })
} 
const update_order_status = async (req, res) => {
  const { orderId, status } = req.body

  Order.findById(orderId)
    .then(order => {
      order.status = status
      order.save()
      res.status(200).json(order)
    })
    .catch(error => {
      console.log(error)
      res.status(400).json({ error: error.message })
    })
}


module.exports = {
  create_order,
  get_orders,
  get_order,
  get_orders_by_status,
  update_order_status
}
