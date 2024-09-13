const express = require('express');
const movieRoutes = require('./routes/movieRoutes'); // Import movie routes
const connectDB = require('./config/db'); // Import your db.js file

const app = express();

connectDB(); 

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.use(movieRoutes);

app.get('/', (req, res) => {
  res.redirect('/movies'); 
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
