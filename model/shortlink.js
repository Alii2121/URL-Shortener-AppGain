const mongoose = require('mongoose')
const shortId = require('shortid')
shortId.generate()

const shortlinkSchema = new mongoose.Schema ({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        default: shortId.generate(),
        required: true
        
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    },
})

module.exports = mongoose.model("shortlink", shortlinkSchema)