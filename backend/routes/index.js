const express = require('express');
const router = express.Router();
const axios = require('axios');
const { User } = require('../models');

// Save GitHub user details
router.post('/users/:username', async (req, res) => {
    const { username } = req.params;
    const existingUser = await User.findOne({ where: { username } });
    
    if (existingUser) {
        return res.status(200).json(existingUser);
    }

    try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        const userData = response.data;

        const newUser = await User.create({
            username: userData.login,
            location: userData.location,
            blog: userData.blog,
            bio: userData.bio,
            public_repos: userData.public_repos,
            public_gists: userData.public_gists,
            followers: userData.followers,
            following: userData.following,
            created_at: userData.created_at,
            updated_at: userData.updated_at
        });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user data from GitHub' });
    }
});

// Additional routes for other functionalities...

module.exports = router;
