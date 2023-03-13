const mongoose = require("mongoose")
const Order = require("../models/orderModel")
const User = require("../models/userModel")
const Product = require("../models/productModel")
const paymentType = require("../middleware/paymentType")

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

const _create_order = async (req, res) => {

  const order = await Order.create({
    mercadopago_data: req.body.type == "mercadopago" ? req.mercadopagoResponse : {},
    user: {
      username: req.body.user.username,
      email: req.body.user.email,
      id: mongoose.Types.ObjectId(req.body.user.id)
    },
    products: req.body.products,
    total: req.body.total,
    shipping: req.body.shipping,
    status: "ordered",
    comment: req.body.order || ""
  })
  if(!order){ res.status(400).json({ error: "No pudimos procesar tu orden"}) }
  console.log("order made")

  const user = await User.findById((req.body.user.id))
  if(!user){ res.status(400).json({ error: "No encontramos un usuario para asignarle esta compra"})}
  user.orders.push(order._id)
  user.checkout = {}
  const save = await user.save()
  if(!save){ res.status(400).json({ error: "No pudimos agregar tu orden a tu usuario" })}
  console.log("order pushed into user")

  await Promise.all(order.products.map(async new_product => {

    console.log("new_product: ", new_product)

    const product = await Product.findById(new_product._id)

    if(!product){ res.status(400).json({ error: "No pudimos reducir el stock de los productos comprados" }) }

    const updatedSizes = await Promise.all(product.sizes.map(item => {

      console.log("product size item: ", item)
      if(item.size == new_product.size){
        return { _id: mongoose.Types.ObjectId(item._id), size: item.size, stock: Number(item.stock) - Number(new_product.quantity) }
      }else{
        return item
      }
    }))

    console.log("sizes: ", product.sizes)
    console.log("updatedSizes: ", updatedSizes)

    product.sizes = updatedSizes
    await product.save()

    console.log("product after changes:", product)
  }))
  console.log("RESPONSE HITS HERE")
  res.status(200).json(order)

}

const create_order = async (req, res, next) => {

  await paymentType(req, res, next)

  Order.create({
    mercadopago_data: req.body.type == "mercadopago" ? req.mercadopagoResponse : {},
    user: {
      username: req.body.user.username,
      email: req.body.user.email,
      id: mongoose.Types.ObjectId(req.body.user.id)
    },
    products: req.body.products,
    total: req.body.total,
    shipping: req.body.shipping,
    status: "ordered",
    comment: req.body.order || ""
  })
    .then(order => {
      User.findById(req.user._id)
        .then(async user => {
          user.orders.push(order._id)
          user.checkout = {}
          const save = user.save()
          if(save){
            await Promise.all(order.products.map(async ordered_product => {
              await Product.findById(ordered_product._id)
                .then(async product => {
                  const updatedSizes = await Promise.all(product.sizes.map(item => {
                    if(item.size === ordered_product.size){
                      return { _id: mongoose.Types.ObjectId(item.id), size: item.size, stock: Number(item.stock) - Number(ordered_product.quantity) }
                    }else{
                      return item
                    }
                  }))
                  product.sizes = updatedSizes 
                  product.save()
                })
            }))
            res.status(200).json(order)
          }else{
            console.log("error")
            res.status(400).json({ error: "3.There was a problem processing your order, please contact us" })
          }
        })
        .catch(error => {
          console.log(error)
          res.status(400).json({ error: "2.There was a problem processing your order, please contact us" })
        })
    })
    .catch(error => {
      console.log(error)
      res.status(400).json({ error: "1.There was a problem processing your order, please contact us"})
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
