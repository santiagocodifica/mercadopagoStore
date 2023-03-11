import { useAuthContext } from "./features/auth"
import { Routes, Route } from "react-router-dom"
import { Navbar } from "./features/cms"
import { ProductsContextProvider } from "./features/cms/products"
import Login from "./pages/Login"
import { Orders, Order } from "./features/cms/orders"
import { Products, Product } from "./features/cms/products"

const Admin = () => {
  const { user } = useAuthContext()
  return(
    <>
      <Navbar />
      <ProductsContextProvider>
        <Routes>
          <Route path="orders" element={ user && user.admin ? <Orders /> : <Login /> } />
          <Route path="orders/:id" element={ user && user.admin ? <Order /> : <Login /> } />
          <Route path="products" element={ user && user.admin ? <Products /> : <Login /> } />
          <Route path="products/:id" element={ user && user.admin ? <Product /> : <Login /> } />
        </Routes>
      </ProductsContextProvider>
    </>
  )
}
export default Admin
