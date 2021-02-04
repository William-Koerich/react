import React from 'react'

export interface Props {
  products: Array<any>
  onRemove: (index: number) => void
}

const Cart: React.FC<Props> = ({ products, onRemove }) => {
  return (
    <>
      <h2>Carrinho</h2>
      <ul style={{ listStyle: 'none' }}>
        {products.map((product, index) => (
          <li key={'carrinho-' + index}>
            {product.name} | R$ {product.price} |{' '}
            <button onClick={() => onRemove(index)}>Remover</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Cart
