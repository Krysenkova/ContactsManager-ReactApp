import React, {useState} from "react";
import {useHistory} from 'react-router-dom'

const ContactItem = props => {
    let history = useHistory()
    console.log(props.contacts)

 /*   let lon
    let lat
    let popup

    let marker = [{
        marker: [lon, lat],
        name: ""
    }]
     let listOfMarkers = []
    const contacts = props.contacts
    contacts.map(contact => {
        lon = contact.lon
        lat = contact.lat
        popup = contact.first_name + " " + contact.last_name
        listOfMarkers.push(marker)
    })
    console.log(listOfMarkers)
    props.updateMarkers(listOfMarkers)*/
    /*    const filter = () => {
            props.contacts.filter(contact => (
                contact.is_private ===false
            ).map(bla))
        }*/
    return (
        <div>
            {props.contacts.map(contact => {
                return <ul onClick={() => history.push(`/update/${contact._id}/`)} className='contact-entry'
                           key={contact._id}>{contact.first_name + " " + contact.last_name + ", " +
                contact.street + ", " + contact.zip + " " + contact.city + ", " + contact.state + ", " + contact.country
                + ", " + contact.owner + ", " + contact.is_private}</ul>
            })}
        </div>
    )
}
export default ContactItem