'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('worklist', {
      Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Message: {
        type: Sequelize.STRING,
        allowNull: false
      },
      UserID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',        // Must match exact table name
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Priority: {
        type: Sequelize.ENUM('Low', 'Medium', 'High'),
        allowNull: false
      },
      Category: {
        type: Sequelize.ENUM('Work', 'Personal'),
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('worklist');
    // ❌ No need for `DROP TYPE` in MySQL
  }
};
