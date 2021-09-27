import React from 'react';

const Input = ({type, id, value, onClick}) => {
    return (
        <input type={type} id={id} className='w3-button w3-lime w3-text-white' value={value} onClick={onClick}/>
    )
}
export default Input