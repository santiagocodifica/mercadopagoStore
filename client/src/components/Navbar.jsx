import { useAuthContext } from "../hooks/useAuthContext"
import { useLogout } from "../hooks/useLogout"

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  return(
    <div>
      { user ? <button onClick={ logout }>Logout</button> : <span>Logeate</span>}
    </div>
  )
}

export default Navbar
