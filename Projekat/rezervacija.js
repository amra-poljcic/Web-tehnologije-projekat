const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
	const Rezervacija = sequelize.define("rezervacija",{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true
		},
	},{
		timestamps: false,
		freezeTableName: true
	})
	return Rezervacija;
};