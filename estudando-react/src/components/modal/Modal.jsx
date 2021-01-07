import { React } from 'react'
import PropTypes from 'prop-types'
import Button from '../button/Button'
import './Modal.css'

const Modal = props => {
  return (
    <div className="modal" style={{ display: props.display }}>
      <div className="header">{props.titulo}</div>
      <div className="content">{props.conteudo}</div>
      <div className="footer">
        <Button cor="#f3f3f3" onClick={props.setdisplay}>
          Sair
        </Button>
      </div>
    </div>
  )
}
export default Modal

Modal.defaultProps = {
  titulo: 'Título',
  conteudo: 'Conteudo',
  display: 'none'
}

Modal.propTypes = {
  titulo: PropTypes.string,
  conteudo: PropTypes.string
}
