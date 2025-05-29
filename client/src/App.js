/**
 * Componente raíz de la aplicación React de Poker Royal
 *
 * Este archivo configura:
 * - Rutas principales usando React Router:
 *   • “/”       → Homepage (pantalla de inicio)
 *   • “/play”   → Game     (interfaz de partida)
 *   • “/verify” → Verify   (confirmación de email después de signup)
 * - Contexto de usuario global (UserContext) para compartir estado de autenticación.
 * - Tema global con Chakra UI para estilos (fondo semitransparente, texto blanco).
 * - Carga inicial: llama al endpoint `/auth/` para comprobar si hay sesión activa,
 *   almacenando los datos del usuario en estado. Muestra un mensaje “Loading…” mientras espera.
 * - Variables de entorno para la URL del backend (`REACT_APP_ENDPOINT`).
 */

import { Route } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import Game from './components/Game/Game';
import Verify from './components/auth/Verify';
import './App.css';
import './cards.css';
import './game.css';
import { UserContext } from './utils/UserContext';
import { useState, useEffect } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

// Definición de tema global para Chakra UI
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'whiteAlpha.200',
        color: 'white',
        m: 0,
        p: 0,
      },
    },
  },
});

const App = () => {
  const url = process.env.REACT_APP_ENDPOINT;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Efecto de carga inicial para verificar sesión
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(`${url}/auth/`, {
          method: 'GET',
          credentials: 'include',
          mode: 'cors',
        })
          .then(res => res.json())
          .then(data => {
            if (data.user) setUser(data.user);
          });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (loading) fetchData();
  }, [url, loading]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className='App'>
      <UserContext.Provider value={{ user, setUser }}>
        <ChakraProvider theme={theme}>
          <Route path='/' exact component={Homepage} />
          <Route path='/play' exact component={Game} />
          <Route path='/verify' exact component={Verify} />
        </ChakraProvider>
      </UserContext.Provider>
    </div>
  );
};

export default App;
