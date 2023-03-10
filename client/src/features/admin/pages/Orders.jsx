import { useGetOrders } from "../api/getOrders"
import OrderListElement from "../components/OrderListElement"

const Orders = () => {
  const { orders } = useGetOrders()

  return ( orders &&
    <ul>
      { orders.map(order => { return(
        <OrderListElement order={ order } key={ order._id } />
      )})}
    </ul>
  )
}
export default Orders 
