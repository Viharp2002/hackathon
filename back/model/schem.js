
const mongo = require('mongoose');

let schemSchema = new mongo.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    desc: {
        type: String,
        required: true
    },
    Type: {
        type: [mongo.SchemaTypes.ObjectId],
        ref: 'form',
        default: []
    },
    Criteria: [{
        id: {
            type: mongo.SchemaTypes.ObjectId,
            ref: 'form'
        },
        criteria: mongo.SchemaTypes.Mixed
    }]

}
    // category,income,proffesion

    // start date for apply
    // deadline for apply

    // one field indicating in which category this schem belongs like school or farmer oe etc
)

module.exports = new mongo.model('schem', schemSchema);