import React from 'react';

const Button = ({id, text, onClick}) => {
    return (
        <button id={id} className='w3-button w3-lime w3-text-white' onClick={onClick}>{text}</button>
    )
}
export default Button