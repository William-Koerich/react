import React from 'react'
import Card from '../src/components/layout/Card'
import './App.css'

export default props => (
  <div className="App">
    <Card
      titulo="R$ 2.806.149,90"
      subtitulo="Fabio Tadeu - 06894"
      descricao="Representante com maior venda no período"
      cor="#67C3EF"
    />
    <Card
      titulo="R$ 0,00"
      subtitulo="Bendini Textil - 07367"
      descricao="Representante com menor venda no período"
      cor="#FF5455"
    />

    <Card
      titulo="R$ 6.890.845,57 - 9.800.000,00"
      subtitulo="Venda"
      descricao="Barra progresso venda"
      cor="#79C447"
    />

    <Card
      titulo="0"
      subtitulo="Clientes perdidos"
      descricao="Quantidade de clientes perdidos"
      cor="#574489"
    />

    <Card
      titulo="7281"
      subtitulo="Novos clientes"
      descricao="Quantidade de novos clientes"
      cor="#09d2c9"
    />

    <Card
      titulo="R$ 6.464,21"
      subtitulo="Ticket médio por Pedido"
      descricao="Valor do ticket médio referente ao período"
      cor="#9c5c33"
    />

    <Card
      titulo="190"
      subtitulo="Média de peças por Pedido"
      descricao="Quantidade média de peças no período"
      cor="#031616"
    />

    <Card
      titulo="217860"
      subtitulo="Número de peças por Pedido"
      descricao="Número de peças no período"
      cor="#cd52a7"
    />
  </div>
)
