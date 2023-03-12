import { loadMercadoPago } from "@mercadopago/sdk-js"
import { useProcessPayment } from "./useProcessPayment"

export const useMercadoPago = () => {

  const { processPayment } = useProcessPayment()
  
  loadMercadoPago()
  const mp = new window.MercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY_TEST, {
    locale: "es-UY"
  })

  const initMercadoPagoForm = (checkout) => {
    const cardForm = mp.cardForm({
      amount: ""+checkout.total,
      iframe: true,
      form: {
        id: "form-checkout",
        cardNumber: { id: "cardNumber", placeholder: "Numero de tarjeta", },
        expirationDate: { id: "expirationDate", placeholder: "MM/YY", },
        securityCode: { id: "securityCode", placeholder: "Código de seguridad", },
        cardholderName: { id: "form-checkout__cardholderName", placeholder: "Titular de la tarjeta", },
        issuer: { id: "form-checkout__issuer", placeholder: "Banco emisor", },
        installments: { id: "form-checkout__installments", placeholder: "Cuotas", },        
        identificationType: { id: "form-checkout__identificationType", placeholder: "Tipo de documento", },
        identificationNumber: { id: "form-checkout__identificationNumber", placeholder: "Número del documento", },
        cardholderEmail: { id: "form-checkout__cardholderEmail", placeholder: "E-mail", },
      },
      callbacks: {
        onFormMounted: error => {
          if(error){ return console.warn("Form Mounted handling error: ", error)}
          console.log("Form mounted")
        },
        onSubmit: event => {
          event.preventDefault()
          const form = cardForm.getCardFormData()
          form.description = ""
          processPayment(checkout, form)
        },
        onFetching: (resource) => {
          // colocar loading en pantalla
        },
        onValidityCheck: (error, event) => {
          console.log(error, event)
        },
        onError: error => {
          console.log(error)
        }
      }
    })
  }

  return { initMercadoPagoForm }
  
}
