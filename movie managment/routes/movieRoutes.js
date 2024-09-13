const express = require('express');
const router = express.Router(); 
const multer = require('multer');
const path = require('path');
const Movie = require('../models/movie');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }).single('poster');

router.get('/movies', async (req, res) => {
    const movies = await Movie.find();
    res.render('index', { movies }); 
  });

router.get('/movies/add', (req, res) => {
  res.render('addMovie');
});

router.post('/movies', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      const { title, description, releaseDate, genre, rating } = req.body;
      const newMovie = new Movie({
        title,
        description,
        releaseDate,
        genre,
        rating,
        poster: req.file ? req.file.filename : ''
      });
      await newMovie.save();
      res.redirect('/movies');
    }
  });
});

router.get('/movies/edit/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.render('editMovie', { movie });
});

router.post('/movies/edit/:id', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      const movie = await Movie.findById(req.params.id);
      movie.title = req.body.title;
      movie.description = req.body.description;
      movie.releaseDate = req.body.releaseDate;
      movie.genre = req.body.genre;
      movie.rating = req.body.rating;
      if (req.file) movie.poster = req.file.filename;
      await movie.save();
      res.redirect('/movies');
    }
  });
});

router.get('/movies/delete/:id', async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.redirect('/movies');
});

module.exports = router; 
