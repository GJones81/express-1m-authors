let router = require('express').Router()
let db = require('../models')

router.get('/', (req, res) => {
  res.render('books/index')
})

router.post('/', (req, res) => {
  db.book.create(req.body)
  .then(() => {
  	res.redirect('/books')
  })
  .catch(err => {
		console.log(err)
		res.render('error')
	})
})

router.get('/new', (req, res) => {
	db.author.findAll()
	.then((authors) => {
	res.render('books/new', { authors })
	})
	.catch(err => {
		console.log(err)
		res.render('error')
	})
  	
})

router.get('/:id', (req, res) => {
	db.book.findOne({
		where: {id: req.params.id},
		include: [ db.author ]
	})
	.then(book => {
		res.render('books/show', { book })
	})
  	.catch(err => {
		console.log(err)
		res.render('error')
	})
})

module.exports = router
