import React, { useState } from 'react'
import Error from './Error'
import PropTypes from 'prop-types';

const Formulario = ({busqueda, setBusqueda, setConsultar}) => {

    const [error, setError] = useState(false)

    // Extraer ciudad y país
    const { ciudad, pais } = busqueda;

    // Función que cambia el state
    const handleChange = e => {
        setBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }

    // Función para obtener el clima
    const handleSubmit = e => {
        e.preventDefault()

        // Validar
        if(ciudad.trim() === '' || pais.trim() === ''){
            setError(true)
            return
        }

        setError(false)

        // Pasarlo al componente principal
        setBusqueda(busqueda)
        setConsultar(true)
    }

    return ( 
        <form
            onSubmit={handleSubmit}
        >
            {
                error ? <Error mensaje="Ambos campos son obligatorios" /> : null
            }
            <div className="input-field col s12">
                <input
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    value={ciudad}
                    onChange={handleChange}
                />
                <label htmlFor="ciudad">Ciudad:</label>
            </div>

            <div className="input-field col s12">
                <select
                    name="pais"
                    id="pais"
                    onChange={handleChange}
                    defaultValue={pais}
                >
                    <option value="" disabled>Selecciona</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                </select>
                <label htmlFor="pais">País:</label>
            </div>

            <div className="input-field col s12">
                <input
                    type="submit"
                    value="Buscar clima"
                    className="waves-effect waves-light btn-large btn-block yellow accent-4"
                />
            </div>
        </form>
    )
}

// Documentar el componente
Formulario.protoType = {
    busqueda: PropTypes.object.isRequired,
    setBusqueda: PropTypes.func.isRequired,
    setConsultar: PropTypes.func.isRequired 
}
 
export default Formulario