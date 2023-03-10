import { useModalsContext } from "@/features/modals"
import { useCartContext } from "../hooks/useCartContext"
import Cart from "./Cart"

// Possible Cart Component
const CartModal = () => {

  const { dispatch, cartModal } = useModalsContext()
  const { cart } = useCartContext()

  return(
    <div
      className={`fixed top-0 ${cartModal.isOpen ? "z-20" : "-z-10"} w-full h-screen text-white`}
    >
      <div
        className="absolute top-0 w-full h-full"
        onClick={() => dispatch({ type: "CLOSE", payload: { modal: "cartModal" } })}
      />
      <div className={`p-4 transition-all duration-700 absolute top-0 ${cartModal.isOpen ? "right-0" : "-right-full"} w-1/3 h-full bg-black`}>
        <h2 className="text-2xl mb-6">Carrito:</h2>
        { cart.length > 0 ? <Cart /> : <span>No hay productos en el carrito...</span> }
      </div>
    </div>
  )
}
export default CartModal
