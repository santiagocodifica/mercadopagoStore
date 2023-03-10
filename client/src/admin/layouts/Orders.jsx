import { useEffect, useState } from "react"
import Order from "../components/Order"
import { useGetOrders } from "@/features/admin"

const Orders = () => {

  const [ order, setOrder ] = useState()
  const { orders } = useGetOrders()

  useEffect(() => {
  },[ order ])

  const openOrder = (order) => { setOrder(order) }

  return(
    <div className="p-4">
      { order && <Order order={order} setOrder={setOrder} /> }
      <h1 className="mb-10 text-2xl" >Orders</h1>
      { orders &&
        <ul>
          { orders.map(order => {return(
            <li className="border-t border-b py-2" key={order._id} onClick={() => openOrder(order)}>
              <span>{ order.status }</span>
              <br />
              <span>{ order.createdAt.substring(0,10) }</span>
              <h3>${ order.total }</h3>
            </li>
          )})}
        </ul>
      }
    </div>
  )
}
export default Orders
