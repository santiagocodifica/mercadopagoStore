const Product = require("../models/productModel")

const checkStock = async (req, res, next) => {

  const products = req.body.products

  try{
    await Promise.all(products.map(async product => {
      const db_product = await Product.findById(product._id).select("sizes")

      if(!db_product){ throw "No se pudo encontrar el producto deseado en el catálogo" }

      const db_product_current_size = await Promise.all(db_product.sizes.fint(size_item => {
        size_item.size === product.size
      }))

      if(!db_product_current_size){
        throw "No se pudo encontrar el talle seleccionado"
      }

      if(db_product_current_size.stock <= product.quantity){
        throw "No hay stock del producto seleccionado en este talle"
      }
    }))
    next()
  }catch(error){
    console.log(error)
    res.status(400).json({ error: "Ocurrió un error al procesar el pago, intenta nuevamente"})
  }

}
module.exports = checkStock
