/**
 * Punto de entrada de la aplicación React
 *
 * Este archivo:
 * - Importa React y ReactDOM para renderizar componentes.
 * - Envuelve el componente raíz <App /> en <BrowserRouter> para habilitar
 *   el enrutamiento basado en la historia del navegador.
 * - Usa React.StrictMode para activar comprobaciones adicionales en desarrollo.
 * - Monta la aplicación en el elemento DOM con id="root".
 */
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)