
import { DataTypes } from '@sequelize/core';
import sequelize from '../../config/database.js';

const Aldeia = sequelize.define(
  'Aldeia',
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
    ninjaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'aldeias',
    timestamps: true,
  }
);

export default Aldeia;
