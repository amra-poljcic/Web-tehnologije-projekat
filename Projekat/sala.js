const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
	const Sala = sequelize.define("sala",{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true
		},
		naziv:Sequelize.STRING,
		
	},{
		timestamps: false,
		freezeTableName: true
	})
	return Sala;
};