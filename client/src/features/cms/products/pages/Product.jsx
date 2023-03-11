import { useParams } from "react-router-dom"
import { useGetProduct } from "../api/getProduct"
import DeleteProductButton from "../components/DeleteProductButton"
import UpdateProductForm from "../components/UpdateProductForm"

const Product = () => {
  const { id } = useParams()
  const { product } = useGetProduct(id)

  return( product &&
    <div>
      { product.name }
      <UpdateProductForm product={product} />
      <DeleteProductButton product={product} />
    </div>
  )
}
export default Product
