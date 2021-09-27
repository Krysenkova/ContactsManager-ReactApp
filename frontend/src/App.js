import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import './App.css';
import 'leaflet/dist/leaflet.css';
import LoginScreen from "./components/LoginScreen";
import MainScreen from "./components/MainScreen";
import AddManagerScreen from "./components/AddManagerScreen";
import UpdateManagerScreen from "./components/UpdateManagerScreen";



const App = () => {
    const [allContacts, setContacts] = useState()
    const [user, setUser] = useState("")

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

    return <Router>
        <Switch>
            <Route path="/" exact>
                {loggedIn ? <Redirect to="/main"/> : <LoginScreen onLoginSucess={loggedinUser}/>}
            </Route>
            <Route path="/main" exact>
                <MainScreen contacts={allContacts} user={user}/>
            </Route>
            <Route path="/add" exact>
                <AddManagerScreen onSaveContact={saveNewContactHandler} user={user}/>
            </Route>
            <Route path="/update/:contactId" exact>
                {/*/:contactId/update*/}
                <UpdateManagerScreen user={user}/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    </Router>
}

export default App;
