let router = require('express').Router()
//require database models
let db = require('../models')

//go to the database a findAll
router.get('/', (req, res) => {
  db.author.findAll()
  	.then((authors) => {
  	res.render('authors/index', {authors})
  	})
  	.catch((err) => {
  	console.log('Error', err)
  	res.render('error')
  })		
})

//create a new author
router.post('/', (req, res) => {
	db.author.create(req.body)
	.then(() => {
		res.redirect('/authors')
	})
	.catch((err) => {
		console.log('Error', err)
		res.render('error')
	})
})

router.get('/new', (req, res) => {
  res.render('authors/new')
})

//shows the author selected from the Authors page by id
router.get('/:id', (req, res) => {
	db.author.findOne({
		where:{ id: req.params.id },
		//joins to the book table, includes the related data 
		include: [ db.book ]
	})
	.then((author) => {
		res.render('authors/show', { author })
	})
	.catch((err) => {
		console.log('Error', err)
		res.render('error')
	})
  
})

module.exports = router
