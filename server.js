const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/items');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// Connecting to MongoDB
mongoose.connect(
    "mongodb://mongodb:27017/test",
    { useNewUrlParser: true }
);

// If there is a connection error send an error message
mongoose.connection.on("error", error => {
    console.log("Database connection error:", error);
    databaseConnection = "Error connecting to Database";
});

// If connected to MongoDB send a success message
mongoose.connection.once("open", () => {
    console.log("Connected to Database!");
    databaseConnection = "Connected to Database";
});

// Test GET request
app.get('/', (req, res) => {
    res.json({ status: 'Backend Connected'});
});

// Use Routes
app.use('/api/items', items);

// Use Environment variable for PORT or 5000
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
