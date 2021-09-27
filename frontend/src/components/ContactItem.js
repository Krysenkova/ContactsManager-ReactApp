import React, {useState} from "react";
import {useHistory} from 'react-router-dom'
import {compose} from "ol/transform";

const ContactItem = props => {
    let history = useHistory()
    console.log(props.contacts)
    const user = props.user
    let lonlet = []
    let popup

    let marker = {
        marker: [],
        name: ""
    }
    let listOfMarkers = []
    const contacts = props.contacts
    contacts.map(contact => {
        lonlet.push(contact.lon)
        lonlet.push(contact.lat)
        popup = contact.first_name + " " + contact.last_name
        marker.marker = lonlet
        marker.name = popup
        listOfMarkers.push(marker)
        lonlet = []
        popup = ""
        marker = {}
    })
    // console.log(" LIST : " + listOfMarkers[0].marker)


    const setMarkers = () => {
        props.updateMarkers(listOfMarkers)
    }

    function handleClick(contact) {
        console.log("U: " + user + "A: " + contact.owner )
        if (user === "normalo" && contact.owner === "admina") {
            alert("You can't update this contact")
            return
        } else
            return history.push(`/update/${contact._id}/`);
    }

    /*    const filter = () => {
            props.contacts.filter(contact => (
                contact.is_private ===false
            ).map(bla))
        }*/
    return (
        <div>
            {props.contacts.map(contact => {
                return <ul onClick={() => handleClick(contact)} className='contact-entry'
                           key={contact._id}>{contact.first_name + " " + contact.last_name + ", " +
                contact.street + ", " + contact.zip + " " + contact.city + ", " + contact.state + ", " + contact.country
                + ", " + contact.owner + ", " + contact.is_private}</ul>
            })}
        </div>
    )
}
export default ContactItem