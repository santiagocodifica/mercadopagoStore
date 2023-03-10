import { useChangeOrderStatus } from "../api/changeOrderStatus"

const OrderStatusSelector = ({ order }) => {

  const { orderStatus, changeOrderStatus } = useChangeOrderStatus(order._id, order.status)

  return(
    <select value={orderStatus} onChange={(e) => changeOrderStatus(e.target.value)}>
      <option value="ordered">Ordered</option>
      <option value="accepted">Accepted</option>
      <option value="shipped">Shipped</option>
      <option value="delivered">Delivered</option>
    </select>
  )
}
export default OrderStatusSelector
