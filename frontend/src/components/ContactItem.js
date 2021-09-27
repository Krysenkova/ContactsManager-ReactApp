import React, {useEffect, useState} from "react";
import {useHistory} from 'react-router-dom'

const ContactItem = props => {
    //const [markers, setMarkers] = useState([{markers: [], name: ""}])
    let history = useHistory()
    const user = props.user
/*
    let lonlat = []
    let popup = ""

    let marker = {
        marker: [],
        name: ""
    }
    let listOfMarkers = []
    let contacts = props.contacts
    useEffect(() => {
        const updateMarkers = () => {
            contacts.map(contact => {
                lonlat.push(contact.lon)
                lonlat.push(contact.lat)
                popup = contact.first_name + " " + contact.last_name
                marker.marker = lonlat
                marker.name = popup
                listOfMarkers.push(marker)
                lonlat = []
                popup = ""
                marker = {}
            })
        }
        console.log("LIST MERKERS: " + listOfMarkers)
        console.log("LM: " + markers)
        setMarkers(listOfMarkers)
        props.markers(listOfMarkers)
        updateMarkers()
    }, [])*/

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