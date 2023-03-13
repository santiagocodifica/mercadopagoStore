import { Link } from "react-router-dom"

const CheckoutError = () => {

  return (
    <div>
      <h2>Ooops, ha ocurrido un error.</h2>
      <Link to="/">Continuar</Link>
    </div>
  )
}
export default CheckoutError
