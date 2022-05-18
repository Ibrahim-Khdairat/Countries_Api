
const CountryModel = (sequelize, DataTypes) => {
       const Country = sequelize.define("Country", {
              id: {
                     type: DataTypes.INTEGER,
                     primaryKey: true,
                     autoIncrement: true
              },
              name: {
                     type: DataTypes.INTEGER,
              },
              cca2: {
                     type: DataTypes.STRING,
              },
              ccn3: {
                     type: DataTypes.STRING,
              },
              cca3: {
                     type: DataTypes.STRING,
              },
              region: {
                     type: DataTypes.STRING,
              },
              // latlng: {
              //        type: DataTypes.ARRAY(DataTypes.FLOAT),
              // },
              currencies: {
                     type: DataTypes.INTEGER,
              },
              languages : {
                     type: DataTypes.INTEGER,
              },
       });
       return Country;
}

module.exports = CountryModel;