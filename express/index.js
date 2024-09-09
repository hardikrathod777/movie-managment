const express = require('express');
const PORT = 5173;
const app = express();

app.get('/',(req, res) => {
    res.end('hello i am home');
})

app.get('/about',(req, res) => {
    res.end('hello i am about');
})

app.listen(PORT , (err) => {
    if(!err){ console.log(`http://localhost:${PORT}/`)};
})


