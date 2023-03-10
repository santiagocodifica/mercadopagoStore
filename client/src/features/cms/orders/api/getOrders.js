import { useAuthContext } from "@/features/auth"
import { useEffect, useState } from "react"

const getOrders = async (user) => {
  const response = await fetch("/api/order/", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${user.token}`
    }
  })
  const orders = await response.json()
  return await orders 
}

export const useGetOrders = () => {
  const [ orders, setOrders ] = useState()
  const { user } = useAuthContext()

  useEffect(() => {
    getOrders(user)
    .then(orders => setOrders(orders))
  },[user])

  return { orders }
}
