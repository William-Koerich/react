import React from 'react'
import './Card.css'

export default props => (
  <div className="Card">
    <div className="Icone" style={{ backgroundColor: props.cor }}>
      {props.icon}
    </div>
    <div className="Titulo">{props.titulo || 'Título'}</div>

    <div className="Subtitulo">{props.subtitulo || 'Subtitulo'}</div>

    <div className="Descricao">{props.descricao || 'Descrição'}</div>

    <div className="hr"></div>

    <div className="MaisInformacoes">+ Informações</div>
  </div>
)
