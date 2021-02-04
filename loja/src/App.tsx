import './App.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cart from './Cart/Cart'
import Store from './Store/Store'
import { Product } from './types/product'

const App = () => {
  /**
   * Used to list products.
   */
  const [products, setProducts] = useState([])

  /**
   * Used to add products to cart.
   */
  const [productsAdded, setProductsAdded] = useState([])

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
  function addItemInCart(product: never) {
    const productsAddedInTheCart = [...productsAdded, product]
    setProductsAdded(productsAddedInTheCart)
  }

  /**
   * Function used for calculate total.
   */
  function calculateTotal(productsAddedInTheCart: Array<Product>) {
    return productsAddedInTheCart.reduce(
      (value: number, product: Product) => value + product.price,
      0
    )
  }

  const removeItemInCart = (idx: number) => {
    setProductsAdded([...productsAdded].filter((_, index) => index !== idx))
  }

  return (
    <div className="App">
      <Store products={products} addItemInCart={addItemInCart} />
      <Cart products={productsAdded} onRemove={removeItemInCart} />

      <h3>Total</h3>

      <h4>R$ {calculateTotal(productsAdded)}</h4>

      <button>Finalizar</button>
    </div>
  )
}

export default App
