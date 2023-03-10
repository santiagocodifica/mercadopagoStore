import { Link } from "react-router-dom"
import { useLogout } from "@/features/auth"
import { useAuthContext } from "@/features/auth"
import { CartButton } from "@/features/cart"

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  return(
    <div className="flex gap-4 p-4">
      <h1 className="grow"><Link to="/">Ir al inicio</Link></h1>
      { user && <Link to="/user">Cuenta</Link>}
      <CartButton />
      { user ? <button onClick={ logout }>Logout</button> : <Link to="/login">Inicia sesión</Link>}
      { !user && <Link to="/signup">Crear usuario</Link> }
    </div>
  )
}

export default Navbar
