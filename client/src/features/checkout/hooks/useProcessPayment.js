import { useAuthContext } from "@/features/auth"
import { useCartContext } from "@/features/cart"
import { useNavigate } from "react-router-dom"

export const useProcessPayment = () => {

  const { user } = useAuthContext()
  const { dispatch } = useCartContext()
  const navigate = useNavigate()
  
  const processPayment = (checkout, cardForm, setIsProcessingPayment) => {
    setIsProcessingPayment(true)
    fetch(`/api/order/mercadopago`, {
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
        user: {
          username: user.username,
          email: user.email,
          id: user.id
        },
        payer: {
          email: cardForm.cardholderEmail,
          identification: {
            type: cardForm.identificationType,
            number: cardForm.identificationNumber
          }
        }
      })
    })
      .then(async response => {
        const json = await response.json()
        setIsProcessingPayment(false)
        if(response.ok){
          dispatch({ type: "CLEAR" })
          navigate("/success")
        }else{
          navigate("/checkoutError", { error: json.error})
        }
      })
  }

  return { processPayment }
}
