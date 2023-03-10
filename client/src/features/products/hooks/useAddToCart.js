import { useCartContext } from "@/features/cart"

import { useCheckCart } from "./useCheckCart"

export const useAddToCart = () => {
  const { checkInCart } = useCheckCart()
  const { dispatch } = useCartContext()
  
  const addToCart = (product, size, stock) => {
    let type;
    if(checkInCart(product._id, size)){ type = "PLUS"  }
    else{ type = "ADD" }
    dispatch({
      type: type,
      payload: {
        product: product,
        size: size,
        stock: stock
      }
    })
  }

  return { addToCart }

}
