const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, unique: true },
    location: DataTypes.STRING,
    blog: DataTypes.STRING,
    bio: DataTypes.STRING,
    public_repos: DataTypes.INTEGER,
    public_gists: DataTypes.INTEGER,
    followers: DataTypes.INTEGER,
    following: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
});

const Friend = sequelize.define('Friend', {
    userId: DataTypes.INTEGER,
    friendId: DataTypes.INTEGER
});

sequelize.sync();
