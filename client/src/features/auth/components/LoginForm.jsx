import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

const LoginForm = () => {

  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const { login, error, isLoading } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
  }

  return(
    <form onSubmit={handleSubmit}>
      <label>Email:</label> 
      <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
      <label>Contraseña:</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
      <button>Inicia sesión</button>
    </form>
  )
}
export default LoginForm
