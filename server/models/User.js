import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db.js";
import bcrypt from 'bcrypt';

export const User = sequelize.define('User', {
     username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
     },
     email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
     },
     password: {
          type: DataTypes.STRING,
          allowNull: false
     }
});

// User.beforeCreate(async(user) => {
//      user.password = await bcrypt.hash(user.password, 10);
// })