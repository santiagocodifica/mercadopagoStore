const mercadopago = require("mercadopago")
const requireMercadopagoToken = require("./requireMercadopagoToken")

const mercadopagoPayment = async (req, res, next) => {


  await requireMercadopagoToken(req, res, next)

  const body = req.body
  const payer = req.body.payer

  const paymentData = {
    transaction_amount: Number(body.transaction_amount),
    token: body.token,
    description: body.descriptions,
    installments: Number(body.installments),
    payment_method_id: body.payment_method_id,
    issuer_id: body.issuer_id,
    payer: {
      email: payer.email,
      identification: {
        type: payer.identification.type,
        number: payer.identification.number
      }
    }
  }


  await mercadopago.payment.create(paymentData)
    .then(data => {
      req.mercadopagoResponse = data
      next()
    })
    .catch(error => {
      console.log("error: ", error)
      res.status(400).json({ error: "Hubo un error al procesar el pago, por favor, intenta nuevamente" })
    })

}

function validateError(error) {
  let errorMessage = 'Unknown error cause';
  let errorStatus = 400;

  if(error.cause) {
    const sdkErrorMessage = error.cause[0].description;
    errorMessage = sdkErrorMessage || errorMessage;

    const sdkErrorStatus = error.status;
    errorStatus = sdkErrorStatus || errorStatus;
  }

  return { errorMessage, errorStatus };
}

module.exports = mercadopagoPayment
