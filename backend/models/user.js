// models/user.js
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      timestamps: false, // Set to true if you're using createdAt/updatedAt
      tableName: 'user' // Optional, Sequelize will pluralize by default
    });
  
    User.associate = (models) => {
      User.hasMany(models.WorkList, {
        foreignKey: 'UserID',
        as: 'WorkLists', // Alias for the association
        onDelete: 'CASCADE' // optional: cascades deletes
      });
    };
  
    return User;
  };
  