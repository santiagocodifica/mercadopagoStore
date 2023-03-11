import { useAuthContext } from "@/features/auth"
import { useCartContext } from "@/features/cart"
import { useNavigate } from "react-router-dom"

export const useProcessPayment = () => {

  const { user } = useAuthContext()
  const { dispatch } = useCartContext()
  const navigate = useNavigate()
  
  const processPayment = async (checkout, cardForm) => {
    await fetch("/api/mercadopago/process_payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      },
      body: JSON.stringify({
        products: checkout.cart,
        shipping: checkout.shipping,
        total: checkout.total,
        token: cardForm.token,
        issuer_id: cardForm.issuerId,
        payment_method_id: cardForm.paymentMethodId,
        transaction_amount: Number(cardForm.amount),
        installments: Number(cardForm.installments),
        description: "Description...",
        user: user,
        payer: {
          email: cardForm.cardholderEmail,
          identification: {
            type: cardForm.identificationType,
            number: cardForm.identificationNumber
          }
        }
      })
    })
    .then(response => response.json())
    .then(() => {
      dispatch({ type: "CLEAR" })
      navigate("/success")
    })
    .catch(error => console.log(error))
  }

  return { processPayment }
}
