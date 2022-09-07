const {Sequelize, DataTypes} = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

// Notre model de données pour les employés
const Pollution = sequelize.define("Pollution", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ts: DataTypes.DATE,
    aqius: DataTypes.INTEGER,
    mainus: DataTypes.STRING,
    aqicn: DataTypes.INTEGER,
    maincn: DataTypes.STRING
}, {timestamps: false});


module.exports = Pollution;