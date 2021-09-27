import React, {useEffect, useState} from "react";
import ContactItem from './ContactItem'

const ContactsList = props => {
    const [loadedContacts, setLoadedContacts] = useState()
    const [user, setUser] = useState()
    let id = props.id
    let markers

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

    })

    console.log(loadedContacts)


    const filterContacts = () => {

    }
    return (
        <div className='contact-list'>
            {loadedContacts && <ContactItem contacts={loadedContacts} user={id}/>
            }
        </div>
    )
}

export default ContactsList