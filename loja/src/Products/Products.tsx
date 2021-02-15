import React from 'react'
import { Product } from '../types/product'

export interface Props {
  products: Array<Product>
}

const Products: React.FC<Props> = ({ products }) => {
  return (
    <>
      <h1 style={{ marginLeft: '31px' }}>Lista de produtos</h1>
      <ul style={{ listStyle: 'none' }}>
        {products.map((order: any, index: number) => (
          <li key={index}>
            {order.name} - Valor R${order.price.toFixed(2)}
          </li>
        ))}
      </ul>

      <div></div>
    </>
  )
}

export default Products
