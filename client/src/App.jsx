import { Routes, Route, Outlet } from 'react-router-dom'
import './App.css'
import Checkout from './pages/Checkout'
import Navbar from './layouts/Navbar'
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from './pages/Home'
import PrepareOrder from './pages/PrepareOrder'
import User from "./pages/User"
import { Order, Orders } from './features/cms/orders'

import { useAuthContext } from './features/auth'
import Product from './pages/Product'
import { CartModal } from './features/cart'

function App() {

  const { user } = useAuthContext()

  return (
    <div>
      <Routes>
        <Route path="" element={ <> <Navbar /><CartModal /><Outlet /> </> }>
          <Route path="" element={ <Home /> } />
          <Route path="product/:id" element={ <Product /> } />
          <Route path="checkout" element={<Checkout />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="pre-checkout" element={ user ? <PrepareOrder /> : <Login />} />
          <Route path="user" element={ user ? <User /> : <Login />} />
        </Route>
        <Route path="admin">
          <Route path="orders" element={ user && user.admin ? <Orders /> : <Login /> } />
          <Route path="orders/:id" element={ user && user.admin ? <Order /> : <Login /> } />
        </Route>
      </Routes>
    </div>
  )
}

export default App
