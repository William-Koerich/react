import './App.css'
import { React, useState, useEffect } from 'react'
import axios from 'axios'

const App = props => {
  /**
   * Used to list products.
   */
  const [products, setProducts] = useState([])

  /**
   * Used to add products to cart.
   */
  const [productsAdded, setProductsAdded] = useState([])

  /**
   * Used to calculate total.
   */
  const [total, setTotal] = useState('')

  /**
   * Conection for DB.
   */
  useEffect(() => {
    axios
      .get('http://localhost:3004/products')
      .then(res => setProducts(res.data))
  }, [])

  /**
   * Function used for added products
   */
  function addItemInCart(product) {
    const productsAddedInTheCart = [...productsAdded, product]
    setProductsAdded(productsAddedInTheCart)
    calculateTotal(productsAddedInTheCart)
  }

  /**
   * Function used for calculate total.
   */
  function calculateTotal(productsAddedInTheCart) {
    const calculateTotal = productsAddedInTheCart.reduce(
      (value, product) => value + product.price,

      0
    )
    setTotal(calculateTotal)
  }

  return (
    <div className="App">
      <h1>Loja</h1>
      <ul style={{ listStyle: 'none' }}>
        {products.map((product, index) => (
          <li key={index}>
            {product.name} | R$ {product.price} |{' '}
            <button onClick={() => addItemInCart(product)}>Adicionar</button>
          </li>
        ))}
      </ul>
      <h2>Carrinho</h2>
      <ul style={{ listStyle: 'none' }}>
        {productsAdded.map((product, index) => (
          <li key={'carrinho-' + index}>
            {product.name} | R$ {product.price} | <button>Remover</button>
          </li>
        ))}
      </ul>
      <h3>Total</h3>

      <h4>{total}</h4>

      <button>Finalizar</button>
    </div>
  )
}

export default App
