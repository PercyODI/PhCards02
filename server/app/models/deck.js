var mongoose = require('mongoose')
var Card = require('./card')
var Schema = mongoose.Schema

var DeckSchema = new Schema({
	name: String,
	owner: String,
	cards: [{}]
})

module.exports = mongoose.model('Deck', DeckSchema)