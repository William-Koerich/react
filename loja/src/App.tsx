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
  const [products, setProducts] = useState<Product[]>([])

  /**
   * Products to filter.
   */
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)

  /**
   * Used to add products to cart.
   */
  const [productsAdded, setProductsAdded] = useState<Product[]>([])

  /**
   * Conection for DB.
   */
  useEffect(() => {
    axios
      .get('http://localhost:3004/products')
      .then(res => {
        setProducts(res.data)
        return res.data
      })
      .then(setFilteredProducts)
  }, [])

  /**
   * Function used for added products
   */
  function addItemInCart(product: Product) {
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

  /**
   * Remove itens in cart.
   */
  const removeItemInCart = (idx: number) => {
    setProductsAdded([...productsAdded].filter((_, index) => index !== idx))
  }

  /**
   * Filter function.
   */
  const filterFunction = (digited: string) => {
    return products.filter(
      word => word.name.toLowerCase().indexOf(digited.toLowerCase()) > -1
    )
  }

  /**
   * Filter products.
   */
  const filterProducts = (filter: string) => {
    setFilteredProducts(filterFunction(filter))
  }

  const finalizeOrder = () => {
    console.log(productsAdded)
  }

  return (
    <div className="App">
      <Store
        products={filteredProducts}
        addItemInCart={addItemInCart}
        filterProducts={filterProducts}
      />
      <Cart products={productsAdded} onRemove={removeItemInCart} />

      <h3>Total</h3>
      <h4>R$ {calculateTotal(productsAdded)}</h4>

      <button onClick={finalizeOrder}>Finalizar</button>
    </div>
  )
}

export default App
