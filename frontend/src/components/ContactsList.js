import React, {useEffect, useState} from "react";
import ContactItem from './ContactItem'
import {useHistory} from "react-router-dom";

const ContactsList = props => {
    const [loadedContacts, setLoadedContacts] = useState()
    let id = props.id
    useEffect(() => {
        let responseData
        const sendRequest = async () => {
            if (props.showMy === false && props.id === "admina") { //add user is admin
                const response = await fetch('http://localhost:5000/api/contacts')
                responseData = await response.json()
                setLoadedContacts(responseData.contacts)
            }
            if (props.showMy === false && props.id === "normalo") {
                const response = await fetch('http://localhost:5000/api/contacts')
                const data = await response.json()
                responseData = data.contacts.filter(function (contact) {
                    if (contact.owner === "normalo" || (contact.is_private === false && contact.owner === "admina")) {
                        return true
                    }
                })

                setLoadedContacts(responseData)
            }
            if (props.showMy === true) {
                const userId = props.id
                console.log("User: " + userId)
                const response = await fetch(`http://localhost:5000/api/contacts/user/${userId}`)
                responseData = await response.json()
                setLoadedContacts(responseData.contacts)
            }

            //console.log(loadedContacts)
        }
        sendRequest()
    }, [props.showMy])
    useEffect(() => {
        if(loadedContacts !== undefined)
        props.contacts(loadedContacts)
    },[loadedContacts])
    return (
        <div className='contact-list'>
            {loadedContacts && <ContactItem contacts={loadedContacts} user={id}/>
            }
        </div>
    )
}

export default ContactsList