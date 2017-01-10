var mongoose = require('mongoose')
var Schema = mongoose.Schema

var CardSchema = new Schema({
	name: String,
	term: String,
	definition: String
})

module.exports = mongoose.model('Card', CardSchema)