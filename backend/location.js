const axios = require('axios')

async function getLonLatFromAddress(address) {
   let data = {
        street: address.street,
        postalcode: address.zip,
        country: address.country,
        state: address.state,
        city: address.city,
        format: "jsonv2"
    }
    const response = await axios.get("https://nominatim.openstreetmap.org/search?", {params: data})

    const responsedData = response.data

    if (!responsedData) {
        console.log("failed get a location");
    } else {
        console.log("successfully got a location");
        const lon = responsedData[0].lon
        const lat = responsedData[0].lat
        return {l1: lon, l2: lat}
    }
}

module.exports = getLonLatFromAddress
