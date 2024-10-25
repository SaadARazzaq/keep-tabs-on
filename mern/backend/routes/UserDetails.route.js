const express = require('express');
const router = express.Router();
const User = require('../models/UserDetails.model'); // User model
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define the folder path for storing avatar uploads
const avatarUploadDir = 'uploads/avatars';

// Check if the directory exists, if not, create it
if (!fs.existsSync(avatarUploadDir)) {
    fs.mkdirSync(avatarUploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, avatarUploadDir); // Use the folder for avatar uploads
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Save file with unique timestamp
    }
});

const upload = multer({ storage: storage });

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

// POST: For creating a new user with file upload
// router.post('/', upload.single('avatar'), async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         // Check if email already exists in the database
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'Email already in use. Please use a different email or sign in.' });
//         }

//         // Handle avatar file if uploaded
//         let avatarPath = null;
//         if (req.file) {
//             avatarPath = req.file.path; // Save the avatar file path
//         }

//         // Create a new user object
//         const newUser = new User({
//             name,
//             email,
//             password,
//             photo: avatarPath // Store avatar path in the database
//         });

//         // Save the new user to the database
//         const savedUser = await newUser.save();

//         res.status(201).json({ message: 'User created successfully', user: savedUser });
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send("Server Error");
//     }
// });

// POST: For creating a new user with file upload
router.post('/', upload.single('avatar'), async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate email format (ensure it is a Gmail address)
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!gmailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format. Please enter a valid Gmail address (e.g., user@gmail.com)' });
        }

        // Check if email already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Handle avatar file if uploaded
        let avatarPath = null;
        if (req.file) {
            avatarPath = req.file.path; // Save the avatar file path
        }

        // Create a new user object
        const newUser = new User({
            name,
            email,
            password,
            photo: avatarPath // Store avatar path in the database
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: savedUser });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});


// GET: For retrieving a single user by MongoDB _id
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.send(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

// DELETE: For deleting a single user by MongoDB _id
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await User.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send("User not found");
        }
        res.send(result);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

// PATCH: For updating a single user by MongoDB _id (no field checks)
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const updates = req.body;

        const options = { new: true };  // Return the updated document
        const result = await User.findByIdAndUpdate(id, updates, options);

        if (!result) {
            return res.status(404).send("User not found");
        }

        res.send(result);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

// POST: Sign in route
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email and password
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).send("Invalid credentials");
        }

        // If successful, send the user data (you can customize this response as needed)
        res.send({ message: 'Login successful', user: { email: user.email, name: user.name } });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
