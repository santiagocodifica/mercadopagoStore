import { useEffect, useState } from "react"

const getProductApi = async (id) => {
  const response = await fetch(`/api/product/one/${id}`, { method: "GET" })
  const product = response.json()
  return product
}

export const useGetProduct = (id) => {
  const [ product, setProduct ] = useState()

  useEffect(() => {
    getProductApi(id)
      .then(product => setProduct(product))
  },[])

  return { product }
}
