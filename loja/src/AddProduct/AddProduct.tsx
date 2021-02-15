import React, { FormEvent } from 'react'
import { Product } from '../types/product'

export interface Props {
  addProduct: (product: Product) => void
}

const AddProduct: React.FC<Props> = ({ addProduct }) => {
  const verifyAndRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const product: Product = {
      name: '',
      price: 0
    }
    addProduct(product)
  }

  return (
    <form onSubmit={verifyAndRegister}>
      <h1>Cadastro de produto</h1>
      <label>Nome: </label>
      <input id="name" name="name" required></input>
      <br />
      <br />
      <label>Preço: </label>
      <input id="price" name="price" required></input>
      <br />
      <br />
      <button type="submit">Cadastrar</button>
    </form>
  )
}

export default AddProduct
