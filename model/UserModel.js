import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { refreshToken } from '../controller/RefreshToken.js';

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
    },
    refreshToken: {
        type: DataTypes.TEXT,
    }
}, {
    timestamps: true,
    tableName: 'users',
});

export default User;