import React, { KeyboardEvent } from 'react'
import { Product } from '../../types/product'
export interface Props {
  products: Array<Product>
  addItemInCart: Function
  filterProducts: Function
}

const Store: React.FC<Props> = ({
  products,
  addItemInCart,
  filterProducts
}) => {
  function filter(event: KeyboardEvent<HTMLInputElement>) {
    filterProducts(event.currentTarget.value)
  }

  return (
    <>
      <h1>Loja</h1>
      <label>Filtro: </label>
      <input onKeyUp={filter.bind(this)}></input>
      <ul style={{ listStyle: 'none' }}>
        {products.map((product: Product, index: number) => (
          <li key={index}>
            {product.name} | R$ {product.price} |{' '}
            <button onClick={() => addItemInCart(product)}>Adicionar</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Store
