'use strict';
module.exports = {
  /**
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {import('sequelize').DataTypes} Sequelize 
   */
   up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BlogPosts', {
      id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: true,
        type: Sequelize.STRING(255),
      },
      content: {
        allowNull: true,
        type: Sequelize.STRING(255),
      },
      published: {
        allowNull: true,
        type: Sequelize.DATE(),
      },
      updated: {
        allowNull: true,
        type: Sequelize.DATE(),
      },
      userId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BlogPosts');
  }
};
