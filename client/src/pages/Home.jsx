import { useGetProducts } from "@/features/products"
import { Link } from "react-router-dom"

const Home = () => {

  const { products } = useGetProducts()

  return( products &&
    <div className="mt-10 p-4">
      <ul>
        { products && products.map(product => {return(
          <Link key={ product._id } to={`product/${ product._id }`}>{ product.name }</Link>
        )})}
      </ul>
    </div>
  )
}

export default Home
