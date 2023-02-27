import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

const Login = () => {
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const { login, error, isLoading } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
  }

  return(
    <form onSubmit={handleSubmit}>
      <h3>Iniciar Sesión</h3>
      <label>Email:</label>
      <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
      <label>Contraseña:</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
      <button>Submit</button>
    </form> 
  )
}

export default Login
