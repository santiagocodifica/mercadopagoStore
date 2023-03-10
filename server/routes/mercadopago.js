const mercadopago = require("mercadopago")
const express = require("express") 
const requireAuth = require("../middleware/requireAuth")
const { processPayment } = require("../controllers/mercadopagoController")

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
router.use(requireAuth)
router.post("/process_payment", processPayment)


module.exports = router
