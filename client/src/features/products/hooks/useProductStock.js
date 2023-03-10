import { useState } from "react"

export const useProductStock = () => {

  const [ isInStock, setIsInStock ] = useState(false)

  const checkStock = (quantity, stock) => {
    if(quantity < stock){ setIsInStock(true) }
    else{ setIsInStock(false) }
  }

  return { isInStock, checkStock }
}
