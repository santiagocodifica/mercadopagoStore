import { useCartContext } from "@/features/cart"
import { useState } from "react"

export const useCheckCart = () => {
  const [ quantity, setQuantity ] = useState(0)
  const { cart } = useCartContext()

  const calculateQuantity = (id, size) => {
    const cartItem = checkInCart(id,size)
    if(cartItem){ setQuantity(cartItem.quantity) }
    else{ setQuantity(0) }
  } 

  const checkInCart = (id, size) => {
    const cartItem = cart.find(item => item._id === id && item.size === size)
    if(cartItem){ return cartItem }
    else{ return }
  }

  return { calculateQuantity, quantity, checkInCart }
}
