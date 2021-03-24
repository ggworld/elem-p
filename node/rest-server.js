const express = require('express');
const app = express();
const port = 53000;
const bodyParser = require('body-parser');
const cors = require('cors');


// Where we will keep books

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('<h1>Welcome to Elementor Command Parser</h1>');
});
app.post('/command', (req, res) => {
    var myd = req.body;

    // Output the book to the console for debugging
    console.log(myd);
    //books.push(book);

    res.send(myd + ' command was parsed');
});
