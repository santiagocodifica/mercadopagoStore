import { useModalsContext } from "@/features/modals"
import { Link } from "react-router-dom"
import { useCartContext } from "../hooks/useCartContext"
import { useCartTotal } from "../hooks/useCartTotal"
import CartItem from "./CartItem"

const Cart = () => {
  const { cart } = useCartContext()
  const { total } = useCartTotal()
  const { dispatch } = useModalsContext()

  return(
      <div>
        <ul className="flex flex-col gap-4 border-t border-gray-600 pt-4">
          { cart.map(product => { return(
            <CartItem key={product._id + product.size} product={product} />
          )})}
        </ul>
        <div>
          <h3>Subtotal: <span>${ total }</span></h3>
          <Link to="/pre-checkout" onClick={() => dispatch({type: "CLOSE", payload: { modal: cartModal }})}>Proceder al pago</Link>
        </div>
      </div>
  )
}
export default Cart
