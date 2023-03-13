const Product = require("../models/productModel")

const checkStock = async (req, res, next) => {

  const products = req.body.products

  await Promise.all(products.map(product => {
    Product.findById(product._id)
      .then(db_product => {
        db_product.sizes.map(size_item => {
          if(size_item.size === product.size && product.quantity >= size_item.stock){
            return res.status(400).json({ error: `Lo sentimos, no tenemos stock disponible del producto: ${ product.name } en este talle`})
          }else{ return }
        })
      })
      .catch(error => {
        console.log(error)
        res.status(400).json({ error: "Ha ocurrido un error al procesar tu pedido, intenta nuevamente"})
      })
  }))
  next()
}
module.exports = checkStock
