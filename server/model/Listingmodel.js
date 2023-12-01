import mongoose from "mongoose";

const ListingSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    Beds: {
        type: Number,
        required: true
    },
    Baths: {
        type: Number,
        required: true
    },
    RegularPrice: {
        type: Number,
        required: true
    },
    Discounted: {
        type: Number,
        required: true
    },
    Parking: {
        type: Boolean,
        required: true
    },
    Furnished: {
        type: Boolean,
        required: true
    },
    Offer: {
        type: Boolean,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    imageurl: {
        type: Array,
        required: true
    },
    UserRef: {
        type: String,
        required: true
    }
}, {timestamps: true})
const Listing = mongoose.model('Listing', ListingSchema)
export default Listing