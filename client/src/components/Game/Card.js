/**
 * Componente Card
 *
 * Este componente renderiza la imagen de una carta de poker según su palo y valor.
 * - Para cartas normales (hearts, diamonds, clubs, spades):
 *   • Usa require dinámico para cargar el SVG correspondiente desde assets/cards/{SUIT}/{SUIT}_{VALUE}.svg
 * - Para la carta de reverso (BACK):
 *   • Carga el SVG desde assets/cards/BACK.svg
 *
 * Props:
 * @param {string} value     - Valor de la carta ('2'–'10', 'J', 'Q', 'K', 'A').
 * @param {string} suit      - Palo de la carta ('hearts', 'diamonds', 'clubs', 'spades', o 'BACK').
 * @param {string} className - Clases CSS adicionales para estilizar la imagen.
 *
 * Ejemplo de uso:
 * <Card suit="hearts" value="A" className="card-large" />
 */
import React from 'react'

function Card({ value, suit, className }) {
    return (
        <>
            {suit!=='BACK'&&<img className={className} alt={suit+"-"+value} src={require(`../../assets/cards/${suit.toUpperCase()}/${suit.toUpperCase()}_${value}.svg`).default}/>}
            {suit==='BACK'&&<img className={className} alt={suit+"-"+value} src={require(`../../assets/cards/${suit}.svg`).default}/>}
        </>
    )
}

export default Card