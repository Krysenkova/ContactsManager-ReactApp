import Button from "./Button";
import React, {useState, useEffect} from "react";
import ContactsList from "./ContactsList";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {useHistory} from "react-router-dom";
import FullWidthButton from "./FullWidthButton";


let markers = [{marker: ["52.520008", "13.404954"], name: "Berlin"}];


const MainScreen = props => {
   // markers = props.markers

    const [showMyContacts, setTypeOfContactsList] = useState(true)
    let history = useHistory()

    const handleLogout = () => {
        history.push('/')
    }
    const showAllBtnClicked = () => {
        setTypeOfContactsList(false)
    }
    const showMyBtnClicked = () => {
        setTypeOfContactsList(true)
    }
    const addBtnClicked = () => {
        history.push('/add')
    }

    return (
        <div id="Main-Screen" className="w3-panel w3-card w3-light-green full-width">
            <Button id='logout-btn' text='Logout' onClick={handleLogout}/>
            <div className="w3-panel centered"><h3 id="header" className="w3-text-white">Hello {props.user}!</h3></div>
            <div className="w3-container w3-row w3-section">
                <div className="w3-container w3-col s6">
                    <ContactsList showMy={showMyContacts} id={props.user}/>
                    <div className="w3-container w3-row w3-section">
                        <FullWidthButton id="show-my-contacts-btn" text='Show my contacts'
                                         onClick={showMyBtnClicked}/>
                    </div>
                    <div className="w3-container w3-row w3-section">
                        <FullWidthButton id="show-all-contacts-btn" text='Show all contacts'
                                         onClick={showAllBtnClicked}/>
                    </div>
                    <div className="w3-container w3-row w3-section">
                        <FullWidthButton id="add-new-contact-btn" text='Add new contact' onClick={addBtnClicked}/>
                    </div>
                </div>
                <div className="w3-container w3-rest extra-padding">
                    <MapContainer
                        className="map-container"
                        center={[52.520008, 13.404954]}
                        zoom={13}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />{" "}
                        <div>
                            {markers.map((marker) => (
                                <Marker position={marker.marker}>
                                    <Popup>{marker.name}</Popup>
                                </Marker>
                            ))}
                        </div>
                    </MapContainer>
                </div>
            </div>
        </div>
    )
}

export default MainScreen