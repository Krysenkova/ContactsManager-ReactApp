import React, {useEffect, useState} from "react";
import ContactItem from './ContactItem'

const ContactsList = props => {
    const [loadedContacts, setLoadedContacts] = useState()
    const [user, setUser] = useState()
    let id = props.id
    let markers
    /*   useEffect(() => {
           const sendRequest = async () => {
               const response = await fetch(`http://localhost:5000/api/users/${id}`)
               const responseData = await response.json()
               setUser(responseData.user)
           }
           sendRequest()

       },[])
       console.log("Main User: " + user)*/
    useEffect(() => {
        let responseData
        const sendRequest = async () => {
            if (props.showMy === false) { //add user is admin
                const response = await fetch('http://localhost:5000/api/contacts')
                responseData = await response.json()
            }
            if (props.showMy === true) {
                const userId = props.id
                console.log("User: " + userId)
                const response = await fetch(`http://localhost:5000/api/contacts/user/${userId}`)
                responseData = await response.json()
            }

            setLoadedContacts(responseData.contacts)
            console.log(loadedContacts)
        }
        sendRequest()

    })

    console.log(loadedContacts)


    const filterContacts = () => {

    }
    return (
        <div className='contact-list'>
            {loadedContacts && <ContactItem contacts={loadedContacts}/>
            }
        </div>
    )
}

export default ContactsList