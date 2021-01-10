import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './Card.css'
import Modal from '../modal/Modal'

const Card = ({
  cor,
  children,
  icon,
  titulo,
  subtitulo,
  descricao,
  ...props
}) => {
  const [Display, setDisplay] = useState('none')
  return (
    <>
      <Modal
        display={Display}
        setdisplay={() => setDisplay('none')}
        conteudo={children}
      />
      <div className="card">
        <div className="icone" style={{ backgroundColor: cor }}>
          {icon}
        </div>
        <div className="titulo">
          <a onClick={() => setDisplay('block')}>{titulo}</a>
        </div>
        <div className="subtitulo">{subtitulo}</div>
        <div className="descricao">{descricao}</div>
        <div className="hr"></div>
        <div className="mais-informacoes">+ Informações</div>
      </div>
    </>
  )
}
export default Card

Card.defaultProps = {
  cor: '#fff',
  titulo: 'Titulo',
  subtitulo: 'Subtitulo',
  descricao: 'Descricao'
}

Card.propTypes = {
  cor: PropTypes.string,
  titulo: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  subtitulo: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}
