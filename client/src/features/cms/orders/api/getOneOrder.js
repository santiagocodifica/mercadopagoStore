import { useAuthContext } from "@/features/auth"
import { useEffect, useState } from "react"

const getOneOrder = async (user, order_id) => {
  const response = await fetch(`/api/order/byId/${ order_id }`,{
    method: "GET",
    headers: {
      "Authorization": `Bearer ${user.token}`
    }
  })
  const order = await response.json()
  return await order
}

export const useGetOneOrder = (order_id) => {
  const [ order, setOrder ] = useState()
  const { user } = useAuthContext()

  useEffect(() => {
    getOneOrder(user, order_id)
    .then(order => setOrder(order))
  },[])

  return { order }
}
