// BASE SETUP
// =============================================================================

var express = require('express')
var app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var port = process.env.PORT || 3456

var mongoose = require('mongoose')
var mongoIP = process.env.MONGO_PORT_27017_TCP_ADDR || "192.168.99.100"
console.log("mongoIP: " + mongoIP)
var mongoPort = process.env.MONGO_PORT_27017_TCP_PORT || 27017
console.log("MongoPort: " + mongoPort)
mongoose.connect('mongodb://' + mongoIP + ':' + mongoPort + '/phcards02')

var Card = require('./app/models/card')
var Deck = require('./app/models/deck')

// ROUTES FOR OUR API
// =============================================================================

var router = express.Router();

router.use(function(req, res, next) {
	console.log("Something is happening.")
	next();
})

router.get('/', function(req, res) {
	res.json({message: 'horray! Welcome to our api!'})
})

router.route('/decks')
	.post(function(req, res) {
		var deck = new Deck();
		deck.name = req.body.name;
		deck.owner = req.body.owner;
		deck.cards = req.body.cards;

		deck.save(function(err) {
			if(err)
				res.send(err);

			res.json({ message: 'Deck Created'})
		})
	})

	.get(function(req, res) {
		Deck.find(function(err, decks) {
			if(err)
				res.send(err)

			res.json(decks)
		})
	})

router.route('/decks/:deck_id')
	.get(function(req, res) {
		Deck.findById(req.params.deck_id, function(err, deck) {
			if(err)
				res.send(err)

			res.json(deck)
		})
	})

	.put(function(req, res) {
		Deck.findById(req.params.deck_id, function(err, deck) {
			if(err)
				res.send(err)

			deck.name = req.body.name
			deck.owner = req.body.owner
			deck.cards = req.body.cards

			deck.save(function(err) {
				if(err)
					res.send(err)

				res.json({message: "Deck updated!"})
			})
		})
	})

	.delete(function(req, res) {
		Deck.remove({
			_id: req.params.deck_id
		}, function(err, deck) {
			if(err)
				res.send(err)

			res.json({message: 'Successfully deleted'})
		})
	})

router.route('/cards')
	.post(function(req, res) {
		var card = new Card();
		card.name = req.body.name;
		card.term = req.body.term;
		card.definition = req.body.definition

		card.save(function(err) {
			if(err)
				res.send(err);

			res.json({ message: 'Card Created!'})
		})
	})

	.get(function(req, res) {
		Card.find(function(err, cards) {
			if(err)
				res.send(err)

			res.json(cards)
		})
	})

// router.route('/bears/:bear_id')
// 	.get(function(req, res) {
// 		Bear.findById(req.params.bear_id, function(err, bear) {
// 			if(err)
// 				res.send(err)

// 			res.json(bear)
// 		})
// 	})

// 	.put(function(req, res) {
// 		Bear.findById(req.params.bear_id, function(err, bear) {
// 			if(err)
// 				res.send(err)

// 			bear.name = req.body.name;

// 			bear.save(function(err) {
// 				if(err)
// 					res.send(err)

// 				res.json({message: 'Bear updated!'})
// 			})
// 		})
// 	})

// 	.delete(function(req, res) {
// 		Bear.remove({
// 			_id: req.params.bear_id
// 		}, function(err, bear) {
// 			if(err)
// 				res.send(err)

// 			res.json({message: 'Successfully deleted'})
// 		})
// 	})

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

app.use('/api', router)
app.get('/', function(req, res) {
	res.sendFile('/node/client/src/index.html')
})

// START THE SERVER
// =============================================================================

app.listen(port);
console.log('Magic happens on port ' + port)