module.exports = (sequelize, DataTypes) => {
    const Friend = sequelize.define('Friend', {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        friendId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        }
    }, {
        timestamps: true
    });

    return Friend;
};
