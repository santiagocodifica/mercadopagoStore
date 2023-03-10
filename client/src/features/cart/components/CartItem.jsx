import { useProductStock } from "@/features/products"
import { useEffect } from "react"
import { useCartContext } from "../hooks/useCartContext"

const CartItem = ({ product }) => {
  const { isInStock, checkStock } = useProductStock()
  const { cart, dispatch } = useCartContext()

  useEffect(() => {
    checkStock(product.quantity, product.stock)
  },[isInStock, cart])

  const handlePlus = () => {
    if(isInStock){ dispatch({
      type: "PLUS",
      payload: { product: product, size: product.size, stock: product.stock }
    })}
  }

  const handleMinus = () => {
    if(product.quantity > 0){ dispatch({
      type: "MINUS", payload: { product: product, size: product.size }
    })}
  }

  const handleRemove = () => {
    dispatch({ type: "REMOVE", payload: { _id: product._id, size: product.size }})
  }

  return(
    <li className="border-b border-gray-600 pb-4">
      <h3>{product.name}</h3>
      <span>Talle: {product.size}</span>
      <br />
      <span>Cantidad: {product.quantity}</span>
      <div>
        <button onClick={handleMinus}>-</button>
        <button onClick={handlePlus}>+</button>
        <button onClick={handleRemove}>Borrar del carrito</button>
      </div>
    </li>
  )
}
export default CartItem
