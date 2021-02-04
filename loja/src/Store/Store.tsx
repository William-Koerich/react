import React from 'react'
import { Product } from '../types/product'

export interface Props {
  products: Array<Product>
  addItemInCart: Function
}

const Store: React.FC<Props> = ({ products, addItemInCart }) => {
  return (
    <>
      <h1>Loja</h1>
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
