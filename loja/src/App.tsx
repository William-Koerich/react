import React, { useState, useEffect, ChangeEvent } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import './App.css'
import 'react-tabs/style/react-tabs.css'

import api from './utils/api'
import { Product } from './types/product'
import { Customer } from './types/customer'
import Store from './components/Store/Store'
import Cart from './components/Cart/Cart'
import Products from './components/Products/Products'
import AddProduct from './components/AddProduct/AddProduct'

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
   *  Used for register customer.
   */
  const [customer, setCustomer] = useState('')

  /**
   * Used for order.
   */
  const [customerSelected, setCustomerSelected] = useState('');

  /**
   * Used for options.
   */
  const [customers, setCustomers] = useState<Customer[]>([])

  const setCustomerValue = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value)
    setCustomerSelected(event.target.value);
  }
 
  useEffect(() => {
    api.get<Customer[]>('/customer').then(res =>
      setCustomers(res.data)
    );
  }, []);

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
    const productsName = productsAdded.map(product => product.name)
    const order = {
      customer: customerSelected,
      totalValue: totalValue,
      discountTotal: discount,
      products: productsName
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
    api.post('/products', product).then(res => console.log(res))
    setProducts([...products, product])
  }

  const applyDiscount = () => {
    const calculateDiscount = (+totalValue * +discount) / 100
    const total = +totalValue - calculateDiscount
    setTotalValue(total)
  }

  const setDiscountValue = (event: ChangeEvent<HTMLInputElement>) => {
    setDiscount(+event.target.value)
  }

  const registerCustomer = () => {
    const customerStruture = {
      name: customer
    }
    api.post('/customer', customerStruture).then(res => console.log(res))
    setCustomer('')
  }

  

  return (
    <div className="App">
      <Tabs className="tab-header">
        <TabList>
          <Tab>Cadastro Cliente</Tab>
          <Tab>Loja</Tab>
          <Tab>Pedidos</Tab>
          <Tab>Cadastro Produtos</Tab>
          <Tab>Estoque</Tab>
        </TabList>

      {
        // Cadastro Cliente
      }
        <TabPanel>
          <label>
            Nome:
          </label>
            <input 
              type="text"
              name='name'
              required
              value={customer}
              onChange={(e) => setCustomer(e.target.value)} 
            />
            <br />
            <br />
            <button onClick={registerCustomer}>Cadastrar</button>
        </TabPanel>

        {/**
         * Loja.
         */}
        <TabPanel>
          <label>Cliente:</label>
          <select onChange={(e) => setCustomerValue(e)}>
          {customers.map(customer => ( 
            <option key={customer.id} value={customer.name}>{customer.name}</option>
          ))}
          </select>
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
                Cliente: {order.customer} <br />
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
          
          <AddProduct addProduct={addProduct}></AddProduct>
        </TabPanel>

         {
          //Estoque
         }
        <TabPanel>
          <Products products={products}></Products>
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default App
