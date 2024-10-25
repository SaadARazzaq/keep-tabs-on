const express = require('express');
const router = express.Router();
const AllDigest = require('../models/AllDigest.model');

// GET all digest entries filtered by email and name (to check for duplicates)
router.get('/', async (req, res) => {
    try {
        const { email, name } = req.query;
        let digests;

        if (email && name) {
            digests = await AllDigest.find({ email: email, name: name });
        } else if (email) {
            digests = await AllDigest.find({ email: email });
        } else {
            digests = await AllDigest.find();
        }

        res.send(digests);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// CREATE a new digest entry with duplicate check
router.post('/', async (req, res) => {
    try {
        const { name, email, favorite = false } = req.body;

        // Check if a digest with the same name and email already exists
        const existingDigest = await AllDigest.findOne({ name, email });
        if (existingDigest) {
            return res.status(400).send({ message: "Digest with this name already exists for the given email." });
        }

        const digest = new AllDigest({ ...req.body, favorite });
        const result = await digest.save();

        res.status(201).send(result);
    } catch (error) {
        console.error("Error creating digest entry:", error.message);
        res.status(500).send("Server Error");
    }
});

router.patch('/favorite/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const { favorite,name } = req.body;


        console.log("Email:", email);
        console.log("Favorite status to update:", favorite);

        // Find the digest entry by email and update the favorite status
        const digest = await AllDigest.findOneAndUpdate(
            { email: email, name: name}, // Find by email
            { $set: { favorite: favorite } }, // Update favorite status
            { new: true } // Return the updated document
        );

        console.log("Updated Digest Entry:", digest.name,digest.favorite);

        if (!digest) {
            return res.status(404).send({ message: "Digest entry not found." });
        }

        // Send back the updated entry
        res.status(200).send(digest);
    } catch (error) {
        console.error("Error updating favorite status:", error.message);
        res.status(500).send("Server Error");
    }
});

router.patch('/archive/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const { isArchive,name } = req.body;


        console.log("Email:", email);
        console.log("Archive status to update:", isArchive);

        // Find the digest entry by email and update the isArchive status
        const digest = await AllDigest.findOneAndUpdate(
            { email: email, name: name}, // Find by email
            { $set: { isArchive: isArchive } }, // Update archive status
            { new: true } // Return the updated document
        );

        console.log("Updated Digest Entry:", digest.name,digest.isArchive);

        if (!digest) {
            return res.status(404).send({ message: "Digest entry not found." });
        }

        // Send back the updated entry
        res.status(200).send(digest);
    } catch (error) {
        console.error("Error updating favorite status:", error.message);
        res.status(500).send("Server Error");
    }
});

// DELETE a digest entry by name and email
router.delete('/deletefunc', async (req, res) => {
    try {
        const { email, name } = req.body; // Get data from the request body
        console.log("Error Traced! ! !");
        console.log(`DELETE request received for email: ${email}, name: ${name}`);

        // Log the search criteria before the deletion
        console.log(`Attempting to find and delete digest entry with email: ${email}, name: ${name}`);

        // Find and delete the digest entry by name and email
        const deletedDigest = await AllDigest.findOneAndDelete({ email: email, name: name });

        if (!deletedDigest) {
            console.warn(`No digest entry found for email: ${email}, name: ${name}`);
            return res.status(404).send({ message: "Digest entry not found." });
        }

        console.log(`Digest entry with email: ${email}, name: ${name} deleted successfully.`);
        res.status(200).send({ message: "Digest entry deleted successfully." });
    } catch (error) {
        console.error(`Error deleting digest entry for email: ${email}, name: ${name}. Error:`, error.message);
        res.status(500).send("Server Error");
    }
});




module.exports = router;
