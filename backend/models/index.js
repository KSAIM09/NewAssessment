const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

const User = require('./user')(sequelize, DataTypes);
const Friend = require('./friend')(sequelize, DataTypes);

User.belongsToMany(User, { as: 'Friends', through: Friend, foreignKey: 'userId', otherKey: 'friendId' });

sequelize.sync();

module.exports = { sequelize, User, Friend };
