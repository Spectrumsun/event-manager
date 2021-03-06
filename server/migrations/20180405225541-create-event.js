

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Events', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    eventName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    startDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    time: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    purpose: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    centerId: {
      type: Sequelize.INTEGER,
      onDelete: 'set null',
      allowNull: true,
      references: {
        model: 'Centers',
        key: 'id',
        as: 'centerId',
      }
    },
    userId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      }
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Events')
};
