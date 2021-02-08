import './App.css'
import React, { useState, useEffect, KeyboardEvent } from 'react'
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
   * Total.
   */
  const [totalValue, setTotalValue] = useState<Number>(0)

  /**
   * Discount percentage.
   */
  const [discount, setDiscount] = useState<Number>(0)

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

  function post() {
    const order = {
      totalValue: totalValue,
      discountTotal: discount
    }

    axios
      .post('http://localhost:3004/orders', order)
      .then(res => console.log(res))
  }

  /**
   * Function used for added products
   */
  function addItemInCart(product: Product) {
    const productsAddedInTheCart = [...productsAdded, product]
    setProductsAdded(productsAddedInTheCart)
    calculateTotal(productsAddedInTheCart)
  }

  /**
   * Function used for calculate total.
   */
  function calculateTotal(productsAddedInTheCart: Array<Product>) {
    const cartValue = productsAddedInTheCart.reduce(
      (value: number, product: Product) => value + product.price,
      0
    )
    return setTotalValue(cartValue)
  }

  /**
   * Remove itens in cart.
   */
  const removeItemInCart = (idx: number) => {
    const productsAddedInTheCart = [...productsAdded].filter(
      (_, index) => index !== idx
    )
    setProductsAdded(productsAddedInTheCart)
    calculateTotal(productsAddedInTheCart)
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
    post()
    setProductsAdded([])
    setTotalValue(0)
    setDiscount(0)
  }

  const applyDiscount = () => {
    const calculateDiscount = (+totalValue * +discount) / 100
    const total = +totalValue - calculateDiscount
    setTotalValue(total)
  }

  const setDiscountValue = (event: KeyboardEvent<HTMLInputElement>) => {
    setDiscount(+event.currentTarget.value)
  }

  return (
    <div className="App">
      <Store
        products={filteredProducts}
        addItemInCart={addItemInCart}
        filterProducts={filterProducts}
      />
      <Cart products={productsAdded} onRemove={removeItemInCart} />
      <br />
      <label>Desconto: </label>
      <input type="text" onKeyUp={setDiscountValue.bind(this)} />
      <button onClick={applyDiscount}>Aplicar</button>

      <h3>Total</h3>
      <h4>R$ {totalValue}</h4>

      <button onClick={finalizeOrder}>Finalizar</button>
    </div>
  )
}

export default App
