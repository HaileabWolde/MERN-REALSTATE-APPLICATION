import mongoose from "mongoose";

const ListingSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Address: {
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
    Price: {
        type: Number,
        required: true
    },
    Discount: {
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
    Type: {
        type: String,
        required: true
    },
    Image: {
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