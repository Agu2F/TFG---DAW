/**
 * Contexto global de usuario para Poker Royal
 *
 * Este módulo crea y exporta un contexto de React (`UserContext`) utilizado
 * para compartir el estado de autenticación del usuario (datos como id, email,
 * username) a lo largo de la aplicación, sin prop drilling.
 *
 * - El valor inicial es `null` hasta que se verifica la sesión.
 * - Se consume mediante `useContext(UserContext)` en componentes que necesiten
 *   acceder o actualizar la información del usuario.
 */
import { createContext } from 'react'

export const UserContext = createContext(null)