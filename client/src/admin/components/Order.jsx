import { useEffect, useState } from "react"
import { useAuthContext } from "@/features/auth"

const Order = (props) => {

  const [ order, setOrder ] = useState()
  const { user } = useAuthContext()

  useEffect(() => {
    setOrder(props.order)
  },[])

  const closeOrder = () => {
    props.setOrder()
  }
  const handleStatusChange = async (e) => {
    fetch("/api/sale", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      },
      body: JSON.stringify({
        saleId: order._id,
        status: e.target.value
      })
    })
    .then(response => response.json())
    .then(json => setOrder(json))
  }

  return( order &&
    <div className="fixed w-1/2 h-1/2 bg-white border">
      <span onClick={closeOrder}>CLOSE</span>
      <br />
      <label>Status: </label>
      <select value={order.status} onChange={handleStatusChange}>
        <option value="ordered">Ordered</option>
        <option value="accepted">Accepted</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
      </select>
      <h2 className="mt-2">Products:</h2>
      <ul>
        { order.products.map(product => {return(
          <li key={product._id + product.size}>
            { product.quantity } x { product.name } | Size: { product.size }
          </li>
        )})}
      </ul>
    </div>
  )
}
export default Order
