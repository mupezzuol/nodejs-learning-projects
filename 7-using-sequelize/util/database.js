const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize(
    'node-complete',
    'root',
    '',
    {host: 'localhost', dialect: 'mysql'}
);

module.exports = sequelize;