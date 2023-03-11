import { useEffect } from "react"
import { useProductsContext } from ".."

const getProductsApi = async () => {
  const response = await fetch(`/api/product/all`, { method: "GET" })
  const products = await response.json()
  return products
}

export const useGetProducts = () => {
  const { dispatch } = useProductsContext()
  
  useEffect(() => {
    getProductsApi()
      .then(products => {
        dispatch({ type: "SET", payload: products })
      })
  },[])
}
