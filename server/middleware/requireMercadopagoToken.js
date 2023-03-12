const mercadopago = require("mercadopago")

const requireMercadopagoToken = async (req, res, next) => {
  const mercadoPagoPublicKey = process.env.MERCADO_PAGO_TEST_PUBLIC_KEY;
  if (!mercadoPagoPublicKey) {
    console.log("Error: public key not defined");
    res.status(404).json({ error: "Hubo un problema al procesar el pago, por favor, intenta nuevamente" })
    process.exit(1);
  }

  const mercadoPagoAccessToken = process.env.MERCADO_PAGO_TEST_ACCESS_TOKEN;
  if (!mercadoPagoAccessToken) {
    console.log("Error: access token not defined");
    res.status(404).json({ error: "Hubo un problema al procesar el pago, por favor, intenta nuevamente" })
    process.exit(1);
  }

  mercadopago.configurations.setAccessToken(mercadoPagoAccessToken)

  return
}

module.exports = requireMercadopagoToken
