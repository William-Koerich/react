import React from 'react'
import PropTypes from 'prop-types'
import './Button.css'

const Button = ({ children, cor, ...props }) => (
  <button className="button" style={{ backgroundColor: cor }} {...props}>
    {children}
  </button>
)

Button.propTypes = {
  cor: PropTypes.string
}

Button.defaultProps = {
  cor: '#e0e1e2'
}
export default Button
