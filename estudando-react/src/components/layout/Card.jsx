import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './Card.css'
import Modal from '../modal/Modal'

const Card = props => {
  const [Display, setDisplay] = useState('none')
  return (
    <>
      <Modal display={Display} setdisplay={() => setDisplay('none')} />
      <div className="card">
        <div className="icone" style={{ backgroundColor: props.cor }}>
          {props.icon}
        </div>

        <div className="titulo">
          <a onClick={() => setDisplay('block')}>{props.titulo || 'Título'}</a>
        </div>

        <div className="subtitulo">{props.subtitulo || 'Subtitulo'}</div>

        <div className="descricao">{props.descricao || 'Descrição'}</div>

        <div className="hr"></div>

        <div className="mais-informacoes">+ Informações</div>
      </div>
    </>
  )
}
export default Card

Card.propTypes = {
  cor: PropTypes.string,
  titulo: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  subtitulo: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}
