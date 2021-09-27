import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import './App.css';
import 'leaflet/dist/leaflet.css';
import LoginScreen from "./components/LoginScreen";
import MainScreen from "./components/MainScreen";
import AddManagerScreen from "./components/AddManagerScreen";
import UpdateManagerScreen from "./components/UpdateManagerScreen";
import ContactItem from "./components/ContactItem";


const App = () => {
    const [allContacts, setContacts] = useState()
    const [user, setUser] = useState("")
    const [markers, setMarkers] = useState("")
    // const [contact, setContact] = useState("")

    let loggedIn = false;
    const saveNewContactHandler = (newContact) => {
        setContacts(allContacts.concat(newContact))
        console.log(allContacts)
    }

    const loggedinUser = (loggedinUser) => {
        setUser(loggedinUser)
        loggedIn = true;
        console.log(loggedinUser)
    }

    const onMarkersUpdate = (markers) => {
        setMarkers(markers)
    }
    /*    const clickedContact = (clickedContact) =>
        {
            setContact(clickedContact)
        }*/

    return <Router>
        <Switch>
            <Route path="/" exact>
                {loggedIn ? <Redirect to="/main"/> : <LoginScreen onLoginSucess={loggedinUser}/>}
            </Route>
            <Route path="/main" exact>
                <MainScreen contacts={allContacts} user={user} markers={markers}/>
            </Route>
            <Route path="/add" exact>
                <AddManagerScreen onSaveContact={saveNewContactHandler} user={user}/>
            </Route>
            <Route path="/update/:contactId" exact>
                {/*/:contactId/update*/}
                <UpdateManagerScreen/>
            </Route>
            <Route>
                <ContactItem updateMarkers={onMarkersUpdate}/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    </Router>
        /*<div>
            <LoginScreen/>
            <ContactsList contacts={allContacts}/>
            <AddManagerScreen onSaveContact={saveNewContactHandler}/>
        </div>*/
        ;
}

export default App;
