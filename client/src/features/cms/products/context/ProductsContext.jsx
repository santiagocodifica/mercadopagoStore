import { createContext, useReducer } from "react";

export const ProductsContext = createContext()

export const productsReducer = (state, action) => {
  switch(action.type){
    case "SET": return { products: action.payload }
    case "CREATE": return { products: [ action.payload, ...state.products ]}
    case "UPDATE": {
      const updatedProducts = [ ...state.products ]
      const indexToUpdate = updatedProducts.findIndex(item => item._id === action.payload._id)
      updatedProducts[indexToUpdate] = action.payload
      return { ...state, products: updatedProducts }
    }
    case "DELETE":
      return { products: state.products.filter(p => p._id !== action.payload._id) }
    default:
      return state
  }
}

export const ProductsContextProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(productsReducer, {
    products: []
  })

  return(
    <ProductsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </ProductsContext.Provider>
  )
}
