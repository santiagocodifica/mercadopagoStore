import { useContext } from "react"
import { ProductsContext } from "../context/ProductsContext"

export const useProductsContext = () => {
  const context = useContext(ProductsContext)
  if(!context){ throw Error("useProductsContext must be used inside ProductsContextProvider") }
  return context
}
