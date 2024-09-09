const express = require('express');
const movieRoutes = require('./routes/movieRoutes'); // Import movie routes

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Use movie routes
app.use(movieRoutes);

// Handle root route
app.get('/', (req, res) => {
  res.redirect('/movies'); // Redirect to the movies list page
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
