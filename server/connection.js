const {Sequelize} = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const Pollution = require('./models/pollution');

return sequelize.authenticate()
    .then(result => {
        console.log(`SQLite successfully connected!`);
        return Pollution.sync();
    })
    .then(result => {
        console.log(`Table created`);
        return result;
    })
    .catch(error => {
        console.error('Unable to connect to SQLite database:', error);
    })