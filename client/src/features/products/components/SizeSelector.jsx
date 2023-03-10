const SizeSelector = (props) => {
  return( props.sizes && 
    <ul className="flex gap-2">
      {props.sizes.map((item, index) => { return(
        <li key={index} onClick={() => props.selectSize(item.size, item.stock)} className={`h-10 aspect-square`}>
          <button
            className={`uppercase border w-full h-full hover:opacity-50 ${props.selectedSize === item.size && "border-black"}`}
          >{ item.size }</button>
        </li>
      )})}
    </ul>
  )
}

export default SizeSelector
