import { React } from 'react'
import PropTypes from 'prop-types'
import Button from '../button/Button'
import './Modal.css'

const Modal = ({ display, titulo, conteudo, setdisplay, ...props }) => {
  return (
    <div className="modal" style={{ display: display }}>
      <div className="header">{titulo}</div>
      <div className="content">{conteudo}</div>
      <div className="footer">
        <Button cor="#f3f3f3" onClick={setdisplay}>
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
  conteudo: PropTypes.node,
  display: PropTypes.string
}
