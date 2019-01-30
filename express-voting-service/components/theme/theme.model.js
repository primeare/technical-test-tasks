'use strict';
/* eslint new-cap: "off", no-magic-numbers: "off" */

module.exports = (sequelize, DataTypes) => {
  const Theme = sequelize.define('themes', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(1024),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [1, 1025],
      },
    },
    yes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });

  return { Theme };
};
