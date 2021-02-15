import React, { useState, useEffect, ChangeEvent } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import './App.css'
import 'react-tabs/style/react-tabs.css'

import Cart from './Cart/Cart'
import Store from './Store/Store'
import Products from './Products/Products'
import { Product } from './types/product'
import AddProduct from './AddProduct/AddProduct'
import api from './utils/api'

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
  const [totalValue, setTotalValue] = useState<number>(0)

  /**
   * Discount percentage.
   */
  const [discount, setDiscount] = useState<number>(0)

  /**
   * Used for list orders.
   */
  const [orders, setOrders] = useState([])

  /**
   * Conection for DB.
   */
  useEffect(() => {
    api
      .get('/products')
      .then(res => {
        setProducts(res.data)
        return res.data
      })
      .then(setFilteredProducts)
  }, [])

  useEffect(() => {
    getOrders()
  }, [])

  const getOrders = () => {
    return api.get('/orders').then(res => {
      setOrders(res.data)
      return res.data
    })
  }

  function post() {
    const productsId = productsAdded.map(product => product.id)
    const order = {
      totalValue: totalValue,
      discountTotal: discount,
      products: productsId
    }

    return api.post('/orders', order).then(res => console.log(res))
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
    post().then(() => {
      setProductsAdded([])
      setTotalValue(0)
      setDiscount(0)
      getOrders()
    })
  }

  const addProduct = (product: Product) => {
    console.log('oi sou o add product', product)
  }

  const applyDiscount = () => {
    const calculateDiscount = (+totalValue * +discount) / 100
    const total = +totalValue - calculateDiscount
    setTotalValue(total)
  }

  const setDiscountValue = (event: ChangeEvent<HTMLInputElement>) => {
    setDiscount(+event.target.value)
  }

  return (
    <div className="App">
      <Tabs className="tab-header">
        <TabList>
          <Tab>Loja</Tab>
          <Tab>Pedidos</Tab>
          <Tab>Produtos</Tab>
        </TabList>

        {/**
         * Loja.
         */}
        <TabPanel>
          <Store
            products={filteredProducts}
            addItemInCart={addItemInCart}
            filterProducts={filterProducts}
          />
          <Cart products={productsAdded} onRemove={removeItemInCart} />
          <br />
          <label>Desconto: </label>
          <input type="text" value={discount} onChange={setDiscountValue} />
          <button onClick={applyDiscount}>Aplicar</button>

          <h3>Total</h3>
          <h4>R$ {totalValue}</h4>

          <button onClick={finalizeOrder}>Finalizar</button>
        </TabPanel>

        {/**
         * Pedidos.
         */}
        <TabPanel>
          <ul style={{ listStyle: 'none' }}>
            {orders.map((order: any, index: number) => (
              <li key={index}>
                Número pedido: {order.id} <br />
                Valor Total: R${order.totalValue.toFixed(2)} <br />
                Disconto aplicado: {order.discountTotal}% <br />
                Código dos produtos: {order.products.join(', ')} <br />
                <hr />
              </li>
            ))}
          </ul>
        </TabPanel>

        {/**
         * Produtos.
         */}
        <TabPanel>
          <Products products={products}></Products>
          <AddProduct addProduct={addProduct}></AddProduct>
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default App
