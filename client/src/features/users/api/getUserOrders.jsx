import { useAuthContext } from "@/features/auth"
import { useEffect, useState } from "react"

const getUserOrdersApi = async (user) => {
  const response = await fetch(`/api/user/orders/${user.id}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${user.token}`
    }
  })
  return await response.json()
}

export const useGetUserOrders = () => {
  const { user } = useAuthContext()
  const [ userOrders, setUserOrders ] = useState()

  useEffect(() => {
    getUserOrdersApi(user)
    .then(orders => setUserOrders(orders))
  },[user])

  return { userOrders }
}
