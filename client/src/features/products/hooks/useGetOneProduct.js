import { useState, useEffect } from "react"

export const useGetOneProduct = (id) => {
  const [ product, setProduct ] = useState()

  useEffect(() => {
    const getProduct = () => {
      fetch(`/api/product/one/${ id }`, { method: "GET" })
      .then(response => response.json())
      .then(json => setProduct(json))
    }
    getProduct()
  },[])

  return { product }
}
