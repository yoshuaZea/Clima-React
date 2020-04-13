import React, { useState, useEffect, Fragment } from 'react';

// Componentes
import Header from './components/Header'
import Formulario from './components/Formulario'
import Clima from './components/Clima'
import Error from './components/Error'

function App() {

  // Main state
  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: ''
  })

  const [consultar, setConsultar] = useState(false)
  const [resultado, setResultado] = useState({})
  const [error, setError] = useState(false)

  const { ciudad, pais } = busqueda

  useEffect(() => {
    consultarAPI()

    // eslint-disable-next-line
  }, [consultar])

  const consultarAPI = async () => {
    if(consultar){
      const appId = '2d26986c1fd26856adf45120ac33e4a2'
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`
      const respuesta = await fetch(url)
      const resultado = await respuesta.json()
      setResultado(resultado)
      setConsultar(false)

      // Si hay error al consultar clima
      if(resultado.cod === '404') setError(true)
      else setError(false)
    }
  }

  const consultarAPI_Fetch = () => {
    // Consultando una API con fetchAPI
    if(consultar){
      const appId = '2d26986c1fd26856adf45120ac33e4a2'
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`
      const clima = fetch(url).then(respuesta => respuesta.json())
      clima.then(res => setResultado(res))
      setConsultar(false)

    }
  }

  // Carga condicional de componentes
  let componente
  if(error) componente = <Error mensaje="No hay resultados" />
  else componente = <Clima
                      resultado={resultado}
                    />
  
  return (
    <Fragment>
      <Header
        titulo={'Clima con React'}
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setConsultar={setConsultar}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
