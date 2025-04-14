// models/todolist.js
module.exports = (sequelize, DataTypes) => {
    const WorkList = sequelize.define('WorkList', {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Message: {
        type: DataTypes.STRING,
        allowNull: false
      },
      UserID: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      Priority: {
        type: DataTypes.ENUM('Low', 'Medium', 'High'),
        allowNull: false
      },
      Category: {
        type: DataTypes.ENUM('Work', 'Personal'),
        allowNull: false
      }
    }, {
      timestamps: false,
      tableName: 'worklist' // Optional, Sequelize will pluralize by default
    });
  
    WorkList.associate = (models) => {
      WorkList.belongsTo(models.User, {
        foreignKey: 'UserID',
        as: 'User'
      });
    };
  
    return WorkList;
  };
  