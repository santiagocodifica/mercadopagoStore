import { useEffect } from "react"
import { useMercadoPago } from "../hooks/useMercadoPago"

import { useGetCheckout } from "../hooks/useGetCheckout"
import { useAuthContext } from "@/features/auth"

const CheckoutForm = () => {

  const { checkout } = useGetCheckout()
  const { initMercadoPagoForm } = useMercadoPago()
  const { user } = useAuthContext()

  useEffect(() => {
    checkout && initMercadoPagoForm(checkout)
  },[checkout])
  
  return( checkout &&
    <form id="form-checkout" className="flex flex-col w-1/2 p-4 mb-10 mt-10 bg-white rounded-xl overflow-scroll">
      <div className="text-4xl font-semibold mb-10 flex">
        <h2 className="grow">Checkout</h2>
        <h3>${ checkout.total }</h3>
      </div>
      <label className="mb-2">Número de tarjeta:</label>
      <div id="cardNumber" className="h-10 w-auto bg-gray-100 p-2 rounded mb-4"></div>
      <label className="mb-2">Fecha de vencimiento:</label>
      <div id="expirationDate" className="h-10 w-auto bg-gray-100 p-2 rounded mb-4"></div>
      <label className="mb-2">CVV:</label>
      <div id="securityCode" className="h-10 w-auto bg-gray-100 p-2 rounded mb-4"></div>
      <label className="mb-2">Nombre del titular:</label>
      <input type="text" id="form-checkout__cardholderName" className="h-10 w-auto bg-gray-100 p-2 rounded mb-4" />
      <select id="form-checkout__issuer" className="h-10 w-auto bg-gray-100 p-2 rounded mb-4 hidden"></select>
      <select id="form-checkout__installments" className="h-10 w-auto bg-gray-100 p-2 rounded mb-4 hidden"></select>
      <select id="form-checkout__identificationType" className="h-10 w-auto bg-gray-100 p-2 rounded mb-4"></select>
      <input type="text" id="form-checkout__identificationNumber" className="h-10 w-auto bg-gray-100 p-2 rounded mb-4" />
      <input type="email" id="form-checkout__cardholderEmail" className="h-10 w-auto bg-gray-100 p-2 rounded mb-4 hidden" value={user.email} />

      <button type="submit" id="form-checkout__submit">Pagar</button>
      {/*<progress value="0" className="progress-bar hidden">Carregando...</progress>*/}
    </form>

  )
}
 export default CheckoutForm
