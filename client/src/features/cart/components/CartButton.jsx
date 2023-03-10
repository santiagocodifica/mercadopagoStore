import { useModalsContext } from "@/features/modals"
import { useCartContext } from "../hooks/useCartContext"
import { IoCartOutline } from "react-icons/io5"

const CartButton = () => {

  const { dispatch } = useModalsContext()
  const { cart } = useCartContext()

  return(
    <button
      onClick={() => dispatch({ type: "OPEN", payload: { modal: "cartModal" }})}
      className="transition-all relative hover:opacity-50"
    >
      { cart.length > 0 &&
        <span className="absolute -top-2 -right-2 w-5 h-5 text-sm rounded-full bg-red-500 text-white">{ cart.length }</span>
      }
      <IoCartOutline className="text-3xl" />
    </button>
  )
}
export default CartButton
