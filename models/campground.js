const mongoose = require('mongoose')
const Review = require('./review')

const Schema = mongoose.Schema

//https://res.cloudinary.com/daeoea1rk/image/upload/v1692436878/YelpCamp/oz0varfmmlwbmr8hvdgn.jpg
// https://res.cloudinary.com/daeoea1rk/image/upload/h_200/v1692385954/YelpCamp/mizbdodf0ehjrlbhmg6k.jpg


const ImageSchema = new Schema({
    url: String,
    filename: String
})

const opts = { toJSON: {virtuals: true}}

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200')
})

const CampgroundSchema = new Schema({
    title: String,
    price: Number,
    geometry: {
        type: {
            type: String, 
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    images: [ImageSchema],
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts)

CampgroundSchema.virtual('properties.popupMarkup').get(function () {
    return `<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>\
            <p>${this.description.substring(0,25)}.....</p>`
})

CampgroundSchema.post('findOneAndDelete', async (camp) => {
    const res = await Review.deleteMany({ _id: { $in: camp.reviews } })
    console.log(res)
})

module.exports = mongoose.model('Campground', CampgroundSchema)