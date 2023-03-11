import { useAuthContext } from "@/features/auth"
import { useProductsContext } from ".."

const updateProductApi = async (user, product) => {
  const response = await fetch(`/api/product/${product._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${user.token}`
    },
    body: JSON.stringify({ product })
  })
  return await response.json()
}

export const useUpdateProduct = () => {
  const { user } = useAuthContext()
  const { dispatch } = useProductsContext()

  const updateProduct = (product) => {
    updateProductApi(user, product)
      .then(product => {
        dispatch({ type: "UPDATE", payload: product })
      })
  }

  return { updateProduct }
}
