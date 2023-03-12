const mercadopagoPayment = require("./mercadopagoPayment")

const paymentType = async (req, res, next) => {
  const { type } = req.params

  if(type == "mercadopago"){
    req.body.type = "mercadopago"
    mercadopagoPayment(req, res, next)
  }else if(type == "admin"){
    req.body.type = "admin"
  }else{
    res.status(400).json({ error: "Ha ocurrido un error al procesar el pago, por favor intente nuevamente"})
  }
}
module.exports = paymentType
