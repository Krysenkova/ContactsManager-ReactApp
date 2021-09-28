import LabelInput from "./LabelInput";
import Input from "./Input";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";

const AddManagerScreen = props => {
    const currentUser = props.user
    console.log(currentUser)
    let history = useHistory()
    const [contact, setContact] = useState(
        {
            firstName: "",
            lastName: "",
            street: "",
            zip: "",
            city: "",
            state: "",
            country: "",
            owner: currentUser,
            is_private: false,
        })

    const onFirstNameChange = event => {
        const firstname_changed = event.target.value;
        setContact(prevState => {
            return {...prevState, firstName: firstname_changed}
        });
    }
    const onLastNameChange = event => {
        const lastname_changed = event.target.value;
        setContact(prevState => {
            return {...prevState, lastName: lastname_changed}
        });
    }
    const onStreetChange = event => {
        const street_changed = event.target.value;
        setContact(prevState => {
            return {...prevState, street: street_changed}
        });
    }
    const onZipChange = event => {
        const zip_changed = event.target.value;
        setContact(prevState => {
            return {...prevState, zip: zip_changed}
        });
    }
    const onCityChange = event => {
        const city_changed = event.target.value;
        setContact(prevState => {
            return {...prevState, city: city_changed}
        });
    }
    const onStateChange = event => {
        const state_changed = event.target.value;
        setContact(prevState => {
            return {...prevState, state: state_changed}
        });
    }
    const onCountryChange = event => {
        const country_changed = event.target.value;
        setContact(prevState => {
            return {...prevState, country: country_changed}
        });
    }

    const onPrivacyChange = event => {
        const privacy_changed = event.target.value;
        setContact(prevState => {
            return {...prevState, is_private: privacy_changed}
        });
    }
    const onOwnerChange = event => {
        const owner_changed = event.target.value;
        if (owner_changed === "self") {
            setContact(prevState => {
                return {...prevState, owner: currentUser}
            });
        } else {
            setContact(prevState => {
                return {...prevState, owner: owner_changed}
            });
        }
    }

    const saveBtnClicked = async event => {
        event.preventDefault()
        const response = await fetch('http://localhost:5000/api/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: contact.firstName,
                last_name: contact.lastName,
                street: contact.street,
                zip: contact.zip,
                city: contact.city,
                state: contact.state,
                country: contact.country,
                is_private: contact.is_private,
                owner: contact.owner
            })
        });
        const responseData = await response.json()
        console.log(responseData)
        if (response.ok) {
            history.push('/main')
        } else {
            alert("Problem with adding contact")
        }


    }

    const cancelBtnClicked = event => {
        event.preventDefault()
        history.push('/main')
    }
    return (
        <div id="Add-Update-Delete-Contact-Screen" className="w3-panel w3-card w3-light-green full-width">
            <form id="Add-Update-Delete-Form" onSubmit={saveBtnClicked}>
                <LabelInput text='First Name' id='first_name' onChange={onFirstNameChange}
                            value={contact.firstName}/>
                <LabelInput text='Last Name' id='last_name' onChange={onLastNameChange} value={contact.lastName}/>
                <LabelInput text='Street,Nr.' id='street' onChange={onStreetChange} value={contact.street}/>
                <LabelInput text='ZIP' id='zip' onChange={onZipChange} value={contact.zip}/>
                <LabelInput text='City' id='city' onChange={onCityChange} value={contact.city}/>
                <LabelInput text='State' id='state' onChange={onStateChange} value={contact.state}/>
                <LabelInput text='Country' id='country' onChange={onCountryChange} value={contact.country}/>

                <div className="w3-container w3-row w3-section">
                    <div className="w3-container w3-col s4">
                        <label className="w3-text-white" htmlFor="is_private"><b>Private</b></label>
                    </div>
                    <div className="w3-rest">
                        <input type="checkbox" id="is_private" name="is_private"

                               onChange={onPrivacyChange} value={contact.is_private}/>
                    </div>
                </div>
                <div className="w3-container w3-row w3-section">
                    <div className="w3-container w3-col s4">
                        <label htmlFor="owner" className="w3-text-white"><b>Choose owner:</b></label>
                    </div>
                    <div className="w3-rest">
                        <select name="owner" id="owner" onClick={onOwnerChange}>
                            <option value="self">self</option>
                            <option value="normalo">normalo</option>  //check if admin
                        </select>
                    </div>
                </div>
                <div className="w3-container w3-row w3-section">
                    <div className="w3-container w3-row w3-section">
                        <Input type="submit" id="add-contact-btn" value="Save" form="Add-Update-Delete-Form"
                               onClick={saveBtnClicked}/>
                        <Input type="button" id="cancel-contact-btn" value="Cancel" onClick={cancelBtnClicked}/>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default AddManagerScreen