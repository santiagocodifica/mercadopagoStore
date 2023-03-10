const OrderUserInfo = ({ userData }) => {
  return(
    <div>
      <h3>Nombre del usuario:</h3>
      <p>{ userData.username }</p>
      <h3>Email:</h3>
      <p>{ userData.email }</p>
    </div>
  )
}
export default OrderUserInfo
