import { useAuthContext } from "@/features/auth"
import { useProductsContext } from ".."

const createProductApi = async(user, product) => {
  const response = await fetch(`/api/product`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${user.token}`
    },
    body: JSON.stringify({ product })
  })
  return await response.json()
}

export const useCreateProduct = () => {
  const { user } = useAuthContext()
  const { dispatch } = useProductsContext()

  const createProduct = (product) => {
    createProductApi(user, product)
      .then(product => {
        dispatch({ type: "CREATE", payload: product })
      })
  } 

  return { createProduct }
}
