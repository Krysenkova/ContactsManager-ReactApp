import React from "react";

const FullWidthButton = ({id, text, onClick}) => {
    return (
        <button id={id} className='w3-button w3-lime w3-text-white full-width' onClick={onClick} >{text}</button>
    )
}
export default FullWidthButton