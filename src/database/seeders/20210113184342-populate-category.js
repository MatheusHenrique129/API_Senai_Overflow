'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('categories',
      [
        {
          description: 'Projetos',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: 'Web Backend',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: 'Web Frontend',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: 'Mobile Frontend',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: 'Mobile Backend',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: 'Sistemas Operacionais',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: 'Hardware',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: 'Banco de dados',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: 'Testes de Software',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          description: 'Redes',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null);
  }
};