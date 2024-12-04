const mongoose = require('mongoose')
const Campground = require('../models/campground')
const Review = require('../models/review')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const axios = require('axios')
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(() => {
        console.log('MONGO CONNECTION OPEN')
    })
    .catch(err => {
        console.log(err)
    })

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedImg = async () => {
    const config = {params: {client_id: 'J7SrfK0i968xqrvrG7yMTr8XqiW9i-gULEcFsK8ybrs', collections: 20431456}}
    const resp = await axios.get('https://api.unsplash.com/photos/random', config)
    return resp.data.urls.small
}

const seedDb = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() *40) + 20
        const c = new Campground({
            author: '64dbabdb9c2541687cc9edd7',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, fugiat quod. Quidem porro tempora quaerat quae modi et eos incidunt beatae cum, nesciunt itaque saepe? Deserunt velit doloremque odio cumque!',
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/daeoea1rk/image/upload/v1692634517/YelpCamp/dhrwz67iojc8uh4kznyr.jpg',
                  filename: 'YelpCamp/dhrwz67iojc8uh4kznyr' 
                },
                {
                  url: 'https://res.cloudinary.com/daeoea1rk/image/upload/v1692634663/YelpCamp/lcvabl8cuwp7tlcf0gwq.jpg',
                  filename: 'YelpCamp/lcvabl8cuwp7tlcf0gwq'
                }
              ],
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
            ]
            }
        })
        await c.save()
    }

}

seedDb()
    .then(() => {
        mongoose.connection.close()
    })


// Review.deleteMany({})
//     .then(() => {
//         mongoose.connection.close()
//     })
