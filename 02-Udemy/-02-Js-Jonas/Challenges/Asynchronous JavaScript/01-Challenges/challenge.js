const whereAmI = function (lat, lon) {
    fetch(`https://geocode.xyz/${lat},${lon}?geoit=json`).
        then(Response => {
            if (!Response.ok) throw new Error(`problem with geocoding ${Response.status}`)
            return Response.json()
        })
        .then(data => {
            console.log(`you are in ${data.city}, ${data.country}`)
            return fetch(`https:restcountries.com/v2/name/${data.country}`)
        }).then(Response => {
            if (!Response.ok) throw new Error(`country not found ${Response.status}`)
            return Response.json()
        })
        .then(data => {
            renderCountry(data[0])
            const neighbour = data[0].borders?.[0];

            if (!neighbour) throw new Error('no nieghbour found')

            /////////////get nieghbour country 
            return fetch(`https://restcountries.com/v2/alpha/${neighbour}`)

        }).then(data => renderCountry(data[0]))
        .catch(err => console.error(`${err.message}`))
}

whereAmI(52.508, 13.381);
whereAmI(45.508, 18.381);
