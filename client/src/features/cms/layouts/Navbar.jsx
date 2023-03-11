import { Link } from "react-router-dom"

const Navbar = () => {
  return(
    <header className="p-4 flex">
      <h1 className="grow"><Link to="">Admin</Link></h1>
      <ul className="flex">
        <li><Link to="orders">Pedidos</Link></li>
        <li><Link to="products">Productos</Link></li>
      </ul>
    </header>
  )
}
export default Navbar
