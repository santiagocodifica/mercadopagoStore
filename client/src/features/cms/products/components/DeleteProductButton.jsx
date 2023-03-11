import { useDeleteProduct } from "../api/deleteProduct"

const DeleteProductButton = ({ product }) => {

  const { deleteProduct } = useDeleteProduct()

  return(
    <button
      className="text-red-500"
      type="button"
      onClick={() => deleteProduct(product)}
    >Borrar Producto</button>
  )
}
export default DeleteProductButton
