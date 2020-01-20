const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
	const Rezervacija = sequelize.define("rezervacija",{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true
		},
		termin: {
			type: Sequelize.INTEGER,
			references: {
				model: "termin"
			}
		},
		sala: {
			type: Sequelize.INTEGER,
			references: {
				model: "sala"
			}
		},
		osoba: {
			type: Sequelize.INTEGER,
			references: {
				model: "osoblje"
			}
		}
	},{
		timestamps: false,
		freezeTableName: true
	})
	return Rezervacija;
};