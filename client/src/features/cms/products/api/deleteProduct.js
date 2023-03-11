import { useAuthContext } from "@/features/auth"
import { useNavigate } from "react-router-dom"
import { useProductsContext } from ".."

const deleteProductApi = async(user, id) => {
  const response = await fetch(`/api/product/${id}`,{
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${user.token}`
    }
  })
  const product = await response.json()
  return product
}

export const useDeleteProduct = () => {
  const { user } = useAuthContext()
  const { dispatch } = useProductsContext()
  const navigate = useNavigate()

  const deleteProduct = (product) => {
    deleteProductApi(user, product._id)
      .then(product => {
        dispatch({ type: "DELETE", payload: product })
        navigate("/admin/products")
      })
  }

  return { deleteProduct }
}
