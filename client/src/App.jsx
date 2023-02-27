import { Routes, Route } from 'react-router-dom'
import './App.css'
import Checkout from './components/Checkout'
import Navbar from './components/Navbar'
import Signup from "./components/Signup"
import Login from "./components/Login"

function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
