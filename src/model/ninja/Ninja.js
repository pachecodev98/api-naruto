
import { DataTypes } from '@sequelize/core';
import sequelize from '../../config/database.js';

const Ninja = sequelize.define(
  'Ninja',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uf: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
  },
  {
    tableName: 'ninjas',
    timestamps: true,
  }
);

export default Ninja;
