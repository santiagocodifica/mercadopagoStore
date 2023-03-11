const SizeInputs = ({ sizes, setSizes }) => {
  return(
    <ul>
      { sizes.map((item, index) => { return(
        <li key={index}>
          <label>Talle:</label>
          <input type="text" value={item.size} onChange={(e) => {
            setSizes(sizes => {
              const updated = [ ...sizes ]
              sizes[index].size = e.target.value
              return updated
            })
          }} />
          <label>Stock:</label>
          <input type="number" value={item.stock} onChange={(e) => {
            setSizes(sizes => {
              const updated = [ ...sizes ]
              sizes[index].stock = Number(e.target.value)
              return updated
            })
          }} />
        </li>
      )})}
    </ul>
  )
}
export default SizeInputs
