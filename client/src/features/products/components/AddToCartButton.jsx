import { useAddToCart } from "../hooks/useAddToCart"

const AddToCartButton = (props) => {
  const { product, size, stock, isActive } = props
  const { addToCart } = useAddToCart()

  return(
    <div>
      <button
        onClick={() => addToCart(product, size, stock)}
        disabled={ isActive ? false : true }
        className={`${!isActive && "opacity-50"}`}
        >Añadir al carrito</button>
      { !isActive && <span>Fuera de stock!</span> }
    </div>
  )
}

export default AddToCartButton
