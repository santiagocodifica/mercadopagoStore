import { useAuthContext } from "@/features/auth"
import { useState } from "react"

const changeStatus = async (user, order_id, status) => {
  const response = await fetch(`/api/order/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${user.token}`
    },
    body: JSON.stringify({
      orderId: order_id,
      status: status
    })
  })
  const order = await response.json()
  return order.status
}

export const useChangeOrderStatus = (order_id, initial_status) => {
  const [ orderStatus, setOrderStatus ] = useState(initial_status)
  const { user } = useAuthContext()

  const changeOrderStatus = (status) => {
    changeStatus(user, order_id, status)
    .then(status => setOrderStatus(status))
  }

  return { orderStatus, changeOrderStatus }
}
