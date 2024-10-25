const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const CreateUser = require('./routes/UserDetails.route'); // Import user route
const SocialMediaProfileRoute = require('./routes/socialMediaProfile.route'); // Import the Social Media Profile route
const AllDigestRoute = require('./routes/AllDigest.route'); // Import the Social Media Profile route

const app = express();
const PORT = process.env.PORT || 4001; // Use either the environment variable or port 4001

// Enable CORS and configure it for specific origins
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://mongodb:27017', {
    dbName: 'DIGESTDB',
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Routes
app.use('/social-media-profiles', SocialMediaProfileRoute); // Use Social Media Profile route
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/all-digests-profiles', AllDigestRoute); // Use Social Media Profile route
app.patch('/favorite/:email', AllDigestRoute);
app.patch('/archive/:email', AllDigestRoute);

// Routes
app.use('/createuser', CreateUser); // Use Social Media Profile route


// Error handling middleware for undefined routes
app.use((req, res, next) => {
    res.status(404).send({ error: "Not found" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
