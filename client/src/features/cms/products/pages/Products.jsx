import { Link } from "react-router-dom"
import { useProductsContext } from ".."
import { useGetProducts } from "../api/getProducts"
import NewProductForm from "../components/NewProductForm"

const Products = () => {

  const { products } = useProductsContext()
  useGetProducts()

  return( products &&
    <div>
      <ul>
        { products.map(product => { return(
          <li key={product._id}>
            <Link to={product._id}>{ product.name }</Link>
          </li>
        )})}
      </ul>
      <NewProductForm />
    </div>
  )
}
export default Products
