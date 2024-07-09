const axios = require('axios');

// 1. Accept any GitHub username and save details
app.post('/api/users/:username', async (req, res) => {
    const { username } = req.params;

    let user = await User.findOne({ where: { username } });
    if (user) {
        return res.status(200).json(user);
    }

    const githubUser = await axios.get(`https://api.github.com/users/${username}`);
    user = await User.create({
        username,
        location: githubUser.data.location,
        blog: githubUser.data.blog,
        bio: githubUser.data.bio,
        public_repos: githubUser.data.public_repos,
        public_gists: githubUser.data.public_gists,
        followers: githubUser.data.followers,
        following: githubUser.data.following,
        created_at: new Date(githubUser.data.created_at),
        updated_at: new Date(githubUser.data.updated_at)
    });

    res.status(201).json(user);
});

// 2. Find mutual followers and save as friends
app.post('/api/users/:username/friends', async (req, res) => {
    const { username } = req.params;

    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const followers = await axios.get(`https://api.github.com/users/${username}/followers`);
    const following = await axios.get(`https://api.github.com/users/${username}/following`);

    const followerUsernames = followers.data.map(f => f.login);
    const followingUsernames = following.data.map(f => f.login);

    const mutuals = followerUsernames.filter(u => followingUsernames.includes(u));

    for (const mutual of mutuals) {
        const friend = await User.findOne({ where: { username: mutual } });
        if (friend) {
            await Friend.create({ userId: user.id, friendId: friend.id });
        }
    }

    res.status(200).json({ message: 'Friends added' });
});

// 3. Search saved data
app.get('/api/users', async (req, res) => {
    const { username, location } = req.query;
    const where = {};
    if (username) where.username = username;
    if (location) where.location = location;

    const users = await User.findAll({ where });
    res.status(200).json(users);
});

// 4. Soft delete a record
app.delete('/api/users/:username', async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({ where: { username } });
    if (user) {
        await user.update({ deletedAt: new Date() });
        res.status(200).json({ message: 'User soft deleted' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// 5. Update user details
app.put('/api/users/:username', async (req, res) => {
    const { username } = req.params;
    const { location, blog, bio } = req.body;

    const user = await User.findOne({ where: { username } });
    if (user) {
        await user.update({ location, blog, bio });
        res.status(200).json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// 6. List all users sorted by a field
app.get('/api/users/sorted', async (req, res) => {
    const { sortBy } = req.query;
    const users = await User.findAll({ order: [[sortBy, 'DESC']] });
    res.status(200).json(users);
});
