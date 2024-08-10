import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db.js";

export const Product = sequelize.define('Product', {
     name: {
          type: DataTypes.STRING,
          allowNull: false
     },
     description : {
          type: DataTypes.STRING,
          allowNull: false
     },
     price: {
          type: DataTypes.FLOAT,
          allowNull: false
     },
     image: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     category: {
          type: DataTypes.STRING,
          allowNull: true,
     },
     rating: {
          type: DataTypes.JSON,
          allowNull: true
     }
});

