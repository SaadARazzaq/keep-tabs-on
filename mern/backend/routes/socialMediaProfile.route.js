const express = require('express');
const router = express.Router();
const SocialMediaProfile = require('../models/SocialMediaProfile.model');

// GET all social media profiles
router.get('/', async (req, res) => {
    try {
        const profiles = await SocialMediaProfile.find();
        res.send(profiles);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

// CREATE a new social media profile
router.post('/', async (req, res) => {
    try {
        console.log('Received POST request:', req.body);  // Ensure request body is being received
        
        const profile = new SocialMediaProfile(req.body);  // Log profile creation
        console.log('Profile instance:', profile);

        const result = await profile.save();  // Check if save operation works
        console.log('Save result:', result);

        res.status(201).send(result);  // If success, return 201
    } catch (error) {
        console.error("Error creating profile:", error.message);
        res.status(500).send("Server Error");
    }
});


// CREATE multiple social media profiles (TESTING)
router.post('/bulk', async (req, res) => {
    try {
        // Ensure request body is an array of profiles
        if (!Array.isArray(req.body)) {
            return res.status(400).send({ message: "Input should be an array of profiles" });
        }

        console.log('Received POST request for multiple profiles:', req.body);  // Ensure request body is being received
        
        // Use map to create new instances of SocialMediaProfile for each object in the array
        const profilePromises = req.body.map(profileData => {
            const profile = new SocialMediaProfile(profileData);  // Create a new profile instance
            return profile.save();  // Save profile and return the Promise
        });

        // Use Promise.all to wait for all profiles to be saved
        const result = await Promise.all(profilePromises);
        console.log('Save result for multiple profiles:', result);

        res.status(201).send(result);  // Return the saved profiles if success
    } catch (error) {
        console.error("Error creating multiple profiles:", error.message);
        res.status(500).send("Server Error");
    }
});



// GET a single social media profile by id
router.get('/:id', async (req, res) => {
    try {
        const profile = await SocialMediaProfile.findOne({ id: req.params.id });
        if (!profile) {
            return res.status(404).send("Profile not found");
        }
        res.send(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

// DELETE a single social media profile by id
router.delete('/:id', async (req, res) => {
    try {
        const result = await SocialMediaProfile.findOneAndDelete({ id: req.params.id });
        if (!result) {
            return res.status(404).send("Profile not found");
        }
        res.send(result);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

// UPDATE a single social media profile by id
router.patch('/:id', async (req, res) => {
    try {
        const updates = req.body;
        const options = { new: true }; // Return the updated document
        const result = await SocialMediaProfile.findOneAndUpdate({ id: req.params.id }, updates, options);
        if (!result) {
            return res.status(404).send("Profile not found");
        }
        res.send(result);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
