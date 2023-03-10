const OrderShippingInfo = ({ shippingData }) => {
  return(
    <div>
      <h3>Nombre</h3>
      <p>{ shippingData.name }</p>
      <h3>Dirección</h3>
      <p>{ shippingData.address }</p>
      <h3>Departamento</h3>
      <p>{ shippingData.department }</p>
      <h3>Ciudad</h3>
      <p>{ shippingData.city }</p>
      <h3>Código Postal</h3>
      <p>{ shippingData.postal_code }</p>
    </div>
  )
}
export default OrderShippingInfo
