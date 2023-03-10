import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../auth"

export const usePrepareCheckout = () => {

  const { user } = useAuthContext()
  const navigate = useNavigate()
  const [ error, setError ] = useState()

  const prepareCheckout = async (data) => {

    if(!data.shippingLocation){
      setError("Selecciona una dirección para proseguir con el pago")
      return
    }

    await fetch("/api/user/create_payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      },
      body: JSON.stringify(data)
    })
    .then(response => response.ok && navigate("/checkout"))
    .catch(error => console.log(error))
  }

  return { prepareCheckout, error }

}
