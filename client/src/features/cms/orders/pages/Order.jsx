import { useParams } from "react-router-dom"
import { OrderStatusSelector } from ".."
import { useGetOneOrder } from "../api/getOneOrder"
import OrderShippingInfo from "../components/OrderShippingInfo"
import OrderUserInfo from "../components/OrderUserInfo"

const Order = () => {

  const { id } = useParams()
  const { order } = useGetOneOrder(id)

  return( order &&
    <div>
      <label>Estado:</label>
      <OrderStatusSelector order={order} />
      <div>
        <h2>Productos comprados:</h2>
        <ul>
          { order.products.map((product, index) => { return(
            <li key={index}>{product.quantity} {product.name} size: {product.size}</li>
          )})}
        </ul>
      </div>
      <OrderShippingInfo shippingData={order.shipping} />
      <OrderUserInfo userData={order.user} />
    </div>
  )
}
export default Order 
