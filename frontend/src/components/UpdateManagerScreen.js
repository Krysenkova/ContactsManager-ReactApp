import React, {useEffect, useState} from "react";
import LabelInput from "./LabelInput";
import Input from "./Input";
import {useHistory, useParams} from "react-router-dom";

const UpdateManagerScreen = props => {
    const contactId = useParams().contactId
    const admin = props.user === "admina"
    let history = useHistory()
    const [contact, setContact] = useState(
        {
            first_name: "",
            last_name: "",
            street: "",
            zip: "",
            city: "",
            state: "",
            country: "",
            owner: "",
            is_private: false
        }
    )
    const [updatedContact, setUpdatedContact] = useState(
        {
            first_name: "",
            last_name: "",
            street: "",
            zip: "",
            city: "",
            state: "",
            country: "",
            owner: "",
            is_private: false
        }
    )
    useEffect(() => {
        const id = contactId
        const sendRequest = async () => {
            let responseData
            const response = await fetch(`http://localhost:5000/api/contacts/${id}`)
            responseData = await response.json()
            if (response.ok) {
                setContact(responseData.contact)
                setUpdatedContact(responseData.contact)
            }
        }
        sendRequest()

    }, [])

    const updateBtnClicked = async event => {
        event.preventDefault()
        console.log("ID: " + contactId)
        console.log("UC: " + updatedContact.first_name + updatedContact.last_name + updatedContact.zip + updatedContact.street + updatedContact.city)
        try {
            const response = await fetch(`http://localhost:5000/api/contacts/${contactId}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    first_name: updatedContact.first_name,
                    last_name: updatedContact.last_name,
                    street: updatedContact.street,
                    zip: updatedContact.zip,
                    city: updatedContact.city,
                    state: updatedContact.state,
                    country: updatedContact.country,
                    owner: updatedContact.owner,
                    is_private: updatedContact.is_private
                })
            });
            const responseData = await response.json()
            console.log(responseData)
        } catch (e) {
            alert("Can't update contact")
        }
        history.push('/main')

    }

    const onFirstNameChange = event => {
        const firstname_changed = event.target.value;
        setUpdatedContact(prevState => {
            return {...prevState, first_name: firstname_changed}
        });
    }


    const onLastNameChange = event => {
        const lastname_changed = event.target.value;
        setUpdatedContact(prevState => {
            return {...prevState, last_name: lastname_changed}
        });
    }


    const onStreetChange = event => {
        const street_changed = event.target.value;
        setUpdatedContact(prevState => {
            return {...prevState, street: street_changed}
        });
    }

    const onZipChange = event => {
        const zip_changed = event.target.value;
        setUpdatedContact(prevState => {
            return {...prevState, zip: zip_changed}
        });
    }

    const onCityChange = event => {
        const city_changed = event.target.value;
        setUpdatedContact(prevState => {
            return {...prevState, city: city_changed}
        });
    }

    const onStateChange = event => {
        const state_changed = event.target.value;
        setUpdatedContact(prevState => {
            return {...prevState, state: state_changed}
        });
    }

    const onCountryChange = event => {
        const country_changed = event.target.value;
        setUpdatedContact(prevState => {
            return {...prevState, country: country_changed}
        });
    }

    const onPrivacyChange = event => {
        const privacy_changed = event.target.value;
        setUpdatedContact(prevState => {
            return {...prevState, is_private: privacy_changed}
        });
    }

    const onOwnerChange = event => {
        const owner_changed = event.target.value;
        setUpdatedContact(prevState => {
            return {...prevState, owner: owner_changed}
        });
    }

    const cancelBtnClicked = event => {
        event.preventDefault()
        history.replace('/main')
    }
    const deleteBtnClicked = async event => {
        event.preventDefault()

        const response = await fetch(`http://localhost:5000/api/contacts/${contactId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        await response.json()
        history.push('/main')
    }
    return (
        <div id="Add-Update-Delete-Contact-Screen" className="w3-panel w3-card w3-light-green full-width">
            <form>
                <LabelInput text='First Name' id='first_name' onChange={onFirstNameChange}
                            value={updatedContact.first_name}/>
                <LabelInput text='Last Name' id='last_name' onChange={onLastNameChange}
                            value={updatedContact.last_name}/>
                <LabelInput text='Street,Nr.' id='street' onChange={onStreetChange} value={updatedContact.street}/>
                <LabelInput text='ZIP' id='zip' onChange={onZipChange} value={updatedContact.zip}/>
                <LabelInput text='City' id='city' onChange={onCityChange} value={updatedContact.city}/>
                <LabelInput text='State' id='state' onChange={onStateChange} value={updatedContact.state}/>
                <LabelInput text='Country' id='country' onChange={onCountryChange} value={updatedContact.country}/>

                <div className="w3-container w3-row w3-section">
                    <div className="w3-container w3-col s4">
                        <label className="w3-text-white" htmlFor="is_private"><b>Private</b></label>
                    </div>
                    <div className="w3-rest">
                        <input type="checkbox" id="is_private" name="is_private" onChange={onPrivacyChange}
                               value={updatedContact.is_private}/>
                    </div>
                </div>
                <div className="w3-container w3-row w3-section">
                    <div className="w3-container w3-col s4">
                        <label htmlFor="owner" className="w3-text-white"><b>Choose owner:</b></label>
                    </div>
                    <div className="w3-rest">
                        <select name="owner" id="owner" onClick={onOwnerChange}>
                            <option value="self">self</option>
                            {admin && <option value="normalo">normalo</option>}
                        </select>
                    </div>
                </div>
                <div className="w3-container w3-row w3-section">
                    <div className="w3-container w3-row w3-section">
                        <Input type="submit" id="update-contact-btn" value="Update" form="Add-Update-Delete-Form"
                               onClick={updateBtnClicked}/>
                        <Input type="button" id="delete-contact-btn" value="Delete" onClick={deleteBtnClicked}/>
                        <Input type="button" id="cancel-contact-btn" value="Cancel" onClick={cancelBtnClicked}/>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default UpdateManagerScreen