import { useEffect, useState } from "react"
import { useCartContext } from "./useCartContext"

export const useCartTotal = () => {

  const [ total, setTotal ] = useState(0)
  const { cart } = useCartContext()

  useEffect(() => {
    let amount = 0 
    cart.forEach( prod => amount += prod.price * prod.quantity)
    setTotal(amount)
  },[ cart ])

  return { total }
}
