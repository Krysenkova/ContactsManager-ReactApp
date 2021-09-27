import React from "react";

const LabelInput = ({text, id, onChange, value}) => {

    return (
        <div className="w3-container w3-row w3-section">
            <div className="w3-container w3-col s4">
                <label className="w3-text-white"><b>{text}</b></label>
            </div>
            <div className="w3-rest">
                <input id={id} className="w3-input" type="text" onChange={onChange} value={value} />
            </div>
        </div>
    )
}
export default LabelInput