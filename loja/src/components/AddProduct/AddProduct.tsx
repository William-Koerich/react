import React, { FormEvent, useState } from 'react'
import { Product } from '../../types/product'

export interface Props {
  addProduct: (product: Product) => void
}

const AddProduct: React.FC<Props> = ({ addProduct }) => {
  /**
   * States.
   */
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)

  const verifyAndRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const product = { name, price, quantity }
    addProduct(product)
    setName('')
    setPrice(0)
    setQuantity(0)
  }

  return (
    <form onSubmit={verifyAndRegister}>
      <h1>Cadastro de produto</h1>
      <label>Nome: </label>
      <input
        id="name"
        name="name"
        value={name}
        onChange={event => setName(event.target.value)}
        type="text"
        required
      ></input>
      <br />
      <br />
      <label>Preço: </label>
      <input
        id="price"
        value={price}
        type="number"
        name="price"
        onChange={event => setPrice(+event.target.value)}
        required
      ></input>
      <br />
      <br />
      <label>Quantidade: </label>
      <input 
        id="quantidade" 
        value={quantity}
        type="number"
        name="quantidade"
        onChange={event => setQuantity(+event.target.value)}
        required
      />
      <br />
      <br />
      <button type="submit">Cadastrar</button>
    </form>
  )
}

export default AddProduct
