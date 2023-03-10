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

module.exports = {
  getAllProducts,
  getProductsById,
  getOneProduct
}
