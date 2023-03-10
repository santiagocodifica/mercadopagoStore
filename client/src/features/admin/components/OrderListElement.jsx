import { Link } from "react-router-dom"

const OrderListElement = ({ order }) => {
  return(
    <li key={ order._id }>
      <Link to={`./${order._id}`}>
        <span>{ order.createdAt.substring(0,10) }</span>
        <span>Estado: { order.status }</span>
        <p>
          { order.products.map(product => {
            return `${product.quantity} ${product.name}`
          })}
        </p>
      </Link>
    </li>
  )
}
export default OrderListElement
