import { useNavigate } from "react-router-dom"
import { useAuthContext } from "./useAuthContext"
import { useCartContext } from "@/features/cart"

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch:cartDispatch } = useCartContext()
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("user")
    cartDispatch({ type: "CLEAR" })
    dispatch({ type: "LOGOUT" })
    navigate("/")
  }

  return { logout }
}
