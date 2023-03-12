const Product = require("../models/productModel")

const getAllProducts = async (req, res) => {
  try{
    const products = await Product.find({}).sort({})
    res.status(200).json(products)
  }catch(error){
    res.status(400).json({ error: error.message })
  }
}

const getProductsById = async (req, res) => {
  const ids = req.query.ids

  try{
    const products = await Product.find({ "_id": { $in: JSON.parse(ids) } })
    res.status(200).json(products)
  }catch(error){
    res.status(400).json({ error: error.message })
  }
}

const getOneProduct = async (req, res) => {
  const { id } = req.params

  Product.findOne({ _id: id })
  .then(product => res.status(200).json(product))
  .catch(error => {
      console.log(error)
      res.status(400).json({ error: error.message })
    })
}

const create_product = async (req, res) => {
  const { product } = req.body

  Product.create({ ...product })
    .then(product => res.status(200).json(product))
    .catch(error => {
      console.log(error)
      res.status(400).json({ error: error.message })
    })
}

const update_product = async (req, res) => {
  const { id } = req.params
  const { product } = req.body

  Product.findOneAndUpdate({ _id: id }, {
    name: product.name,
    price: product.price,
    description: product.description,
    category: product.category,
    sizes: product.sizes
  })
    .then(product => { res.status(200).json(product) })
    .catch(error => {
      console.log(error)
      res.status(400).json({ error: error.message })
    })
}

const delete_product = async (req, res) => {
  const { id } = req.params

  Product.findOneAndDelete({ _id: id })
    .then(product => res.status(200).json(product))
    .catch(error => {
      console.log(error)
      res.status(400).json({ error: error.message })
    })
}

module.exports = {
  getAllProducts,
  getProductsById,
  getOneProduct,
  create_product,
  update_product,
  delete_product
}
