import { useReducer } from "react"

const formReducer = (state, action) => {
  switch(action.type){
    case "SET": {
      const requiredInputs = []
      action.payload.map(input => {
        let newInput = { name: input.name, empty: true, error: false }
        requiredInputs.push(newInput)
      })
      return { requiredInputs: requiredInputs }
    }
    case "SET_ERROR": {
      const updatedRequiredInputs = state.requiredInputs.map(input => {
        if(input.name === action.payload.name){
          input.empty = action.payload.empty
          input.error = action.payload.error
        }
        return input
      })
      return { requiredInputs: updatedRequiredInputs }
    }
    default: { return state }
  }
}

export const useRequiredForm = () => {

  const [ state, dispatch ] = useReducer(formReducer, {
    requiredInputs: []
  })

  const setInputs = (inputs) => {
    dispatch({ type: "SET", payload: inputs })
  }

  const checkValue = (e) => {
    if(e.target.value === ""){
      dispatch({ type: "SET_ERROR", payload: { name: e.target.name, empty: true, error: true }})
    }else{
      dispatch({ type: "SET_ERROR", payload: { name: e.target.name, empty: false, error: false } })
    }
  }

  return { checkValue, setInputs, error: state.requiredInputs }

}
