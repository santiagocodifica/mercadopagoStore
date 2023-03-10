import { useCartContext } from "@/features/cart"
import { usePrepareCheckout } from "../hooks/usePrepareCheckout"
import { useShippingLocation } from "../hooks/useShippingLocation"

const ProceedToPaymentButton = () => {

  const { shippingLocation } = useShippingLocation()
  const { cart } = useCartContext()
  const { prepareCheckout } = usePrepareCheckout()

  const handleClick = () => {
    if(!shippingLocation){ return }
    if(cart.length === 0){ return }
    prepareCheckout({ shippingLocation, cart })
  }
  return(
    <button onClick={handleClick}>Proceder al pago</button>
  )
}
export default ProceedToPaymentButton
