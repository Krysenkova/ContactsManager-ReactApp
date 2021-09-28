import React, {useEffect, useState} from "react";
import {useHistory} from 'react-router-dom'

const ContactItem = props => {
    const [hoveringContact, setHoveringContact] = useState()
    let history = useHistory()
    const user = props.user

    function handleClick(contact) {
        if (user === "normalo" && contact.owner === "admina") {
            alert("You can't update this contact")
            return
        } else
            return history.push(`/update/${contact._id}/`);
    }


    function setPrivacy(is_private) {
        if (is_private)
            return "private"
        else return "public"
    }

    return (
        <div>
            {props.contacts.map(contact => {
                return <ul onClick={() => handleClick(contact)} className='contact-entry'
                           key={contact._id}>{contact.first_name + " " + contact.last_name + ", " +
                contact.street + ", " + contact.zip + " " + contact.city + ", " + contact.state + ", " + contact.country
                + ", " + contact.owner + ", " + setPrivacy(contact.is_private)}</ul>
            })}
        </div>
    )
}
export default ContactItem