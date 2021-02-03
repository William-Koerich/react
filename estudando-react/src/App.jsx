import { React, useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../src/components/layout/Card'
import './App.css'
import Modal from './components/modal/Modal'

const App = props => {
  const [products, setProducts] = useState([])

  console.log({ products, setProducts })

  useEffect(() => {
    axios
      .get('http://localhost:3004/products')
      .then(res => setProducts(res.data))
  }, [])
  return (
    <div className="App">
      {products.map(product => (
        <Card titulo={product.name} subtitulo={product.id} key={product.id}>
          Nome do produto: {product.name}
        </Card>
      ))}
    </div>
  )
}

export default App
