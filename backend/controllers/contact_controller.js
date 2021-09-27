const getGeoLocation = require('../location')
const Contact = require('../models/contact_model')

exports.getContacts = async function (req, res, next) {
    let contacts = Contact.find().exec()
    contacts.then(result => this.setState(result)).catch(err => console.log("Failed" + err))
    res.json({contacts: (await contacts).map(u => u.toObject())})
}

exports.getContactById = async function (req, res, next) {
    const contactId = req.params._id;
    let contact;
    try {
        contact = await Contact.findById(contactId)
    } catch (err) {
        console.log("Contact is not found")
    }
    res.json({contact: contact.toObject()});
}


exports.getContactsByUserId = async function (req, res, next) {
    const userId = req.params.owner
    let contacts = Contact.find({owner: userId}).exec()
    contacts.then(result => this.setState(result))

    res.json({contacts: (await contacts).map(c => c.toObject())});
}

exports.createContact = async function (req, res, next) {
    const {
        first_name, last_name, street, zip, city, state, country,
        is_private, owner
    } = req.body;
    const address = {street: street, zip: zip, country: country, state: state, city: city}
    const geoLocation = await getGeoLocation(address)
    console.log(geoLocation)
    const createdContact = new Contact({
        first_name,
        last_name,
        street,
        zip,
        city,
        state,
        country,
        is_private,
        owner,
        lon: geoLocation.l1,
        lat: geoLocation.l2
    });

    try {
        createdContact.save()
    } catch (err) {
        console.log("Contact wasn't created")
    }
    res.status(201).json({contact: createdContact})
}

exports.updateContact = async function (req, res, next) {
    const {
        first_name, last_name, street, zip, city, state, country,
        is_private, owner
    } = req.body;
    console.log(req.body)
    const contactId = req.params._id
    let contact
    let geoLocation
    try {
        contact = await Contact.findById(contactId)
    } catch (err) {
        console.log("Smth went wrong here")
    }

    const address = {street: street, zip: zip, country: country, state: state, city: city}
    try {
        geoLocation = await getGeoLocation(address)
    } catch (err) {
        console.log("Smth went wrong" + err.message)
    }
    contact.first_name = first_name;
    contact.last_name = last_name;
    contact.street = street;
    contact.zip = zip;
    contact.city = city;
    contact.state = state;
    contact.country = country;
    contact.is_private = is_private;
    contact.owner = owner;
    contact.lon = geoLocation.l1;
    contact.lat = geoLocation.l2;

    try {
        await contact.save()
    } catch (err) {
        console.log("Smth went wrong" + err.message)
    }
    res.status(200).json({contact: contact.toObject()})
}

exports.deleteContact = async function (req, res, next) {
    const contactId = req.params._id;
    let contact
    try {
        contact = await Contact.findById(contactId)
    } catch (err) {
        console.log("Smth went wrong")
    }
    try {
        await contact.remove()
    } catch (err) {
        console.log("Smth went wrong")
    }
    res.status(200).json({message: "Contact deleted"})
}