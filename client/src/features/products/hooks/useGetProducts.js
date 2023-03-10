import { useEffect, useState } from "react"

export const useGetProducts = () => {

  const [ products, setProducts ] = useState()

  useEffect(() => {
    const getAllProducts = () => {
      fetch("/api/product/all", { method: "GET" })
        .then(response => response.json())
        .then(json => setProducts(json))
    }
    getAllProducts()
  },[])

  return { products }
}
