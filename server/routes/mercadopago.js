const mercadopago = require("mercadopago")
const express = require("express") 

// VERIFY IF USER IS AUTENTICATED

const mercadoPagoPublicKey = process.env.MERCADO_PAGO_TEST_PUBLIC_KEY;
if (!mercadoPagoPublicKey) {
  console.log("Error: public key not defined");
  process.exit(1);
}

const mercadoPagoAccessToken = process.env.MERCADO_PAGO_TEST_ACCESS_TOKEN;
if (!mercadoPagoAccessToken) { console.log("Error: access token not defined");
  process.exit(1);
}

mercadopago.configurations.setAccessToken(mercadoPagoAccessToken)

const router = express.Router()

router.post("/process_payment", (req, res) => {
  const { body } = req;
  const { payer } = body;

  const paymentData = {
    transaction_amount: Number(body.transaction_amount),
    token: body.token,
    description: body.description,
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
  };

  mercadopago.payment.create(paymentData)
    .then((data) => {
      console.log(data);
      // here goes the database stuff 
      res.status(200).json(data)
    })
    .catch((error) => {
      console.log(error);
      const { errorMessage, errorStatus }  = validateError(error);
      res.status(errorStatus).json({ error_message: errorMessage });
    });
})

module.exports = router
