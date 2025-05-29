/**
 * Componente Verify:
 * ------------------
 * Este componente verifica la cuenta de usuario a través de un parámetro de consulta `id`:
 *  - Extrae `id` de la query string (props.location.search) con `query-string`.
 *  - En el `useEffect`, envía una petición GET a `/auth/verify/{id}`:
 *      • Si la respuesta es 200, marca `verified = true`.
 *      • Siempre deja `loading = false` tras la petición.
 *  - Renderizado condicional:
 *      • Mientras `loading` es true: muestra “Loading...”.
 *      • Si `verified` es true: muestra mensaje de éxito y enlace a la página principal.
 *      • Si `verified` es false: muestra mensaje de error y sugiere registrarse de nuevo.
 */

import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import { Link } from 'react-router-dom'

const url = process.env.REACT_APP_ENDPOINT

export default function Verify(props) {
    const [loading, setLoading] = useState(true)
    const [verified, setVerified] = useState(false)
    var { id } = queryString.parse(props.location.search)

    useEffect(() => {
            if (loading) {
                fetch(`${url}/auth/verify/${id}`, {
                    method: 'GET',
                    credentials: 'include',
                }).then(res => { 
                    if (res.status===200) setVerified(true)
                    setLoading(false)
                })
            }
        }, [])

    if (loading) return(<h1>Loading...</h1>)

    if (verified) return (
        <>
        <h1>Verified</h1>
        <h1>Return to <Link style={{ color: 'blue', textDecoration: 'underline' }} to='/'>homepage</Link> to sign in</h1>
        </>
    )

    if (!verified) return (
        <>
        <h1>Error: User not found, you may already be verified</h1>
        <h1>Return to <Link style={{ color: 'blue', textDecoration: 'underline' }} to='/'>homepage</Link> to sign up again</h1>
        </>
    )
}

