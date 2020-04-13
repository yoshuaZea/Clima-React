import React from 'react'
import PropTypes from 'prop-types';

const Error = ({mensaje}) => (
    <p className="red darken-4 error">{mensaje}</p>
)

// Documentar el componente
Error.protoType = {
    mensaje: PropTypes.string.isRequired
}
 
export default Error;