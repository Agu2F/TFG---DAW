/**
 * Componente Spinner
 *
 * Muestra una animación de puntos suspensivos (ellipsis) para indicar
 * una acción en curso o carga de datos.
 *
 * - Utiliza una estructura de divs anidados con la clase `lds-ellipsis`.
 * - Los estilos de animación se definen en "Spinner.css".
 *
 * Ejemplo de uso:
 * <Spinner />
 */

import React from 'react';
import "./Spinner.css";

function Spinner() {
    return (
        <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default Spinner;
