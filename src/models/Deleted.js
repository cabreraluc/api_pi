const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('deleted', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    health:{
      type: DataTypes.INTEGER
    },
    attack:{
      type: DataTypes.INTEGER
    },
    defense:{
      type: DataTypes.INTEGER
    },
    speed:{
      type: DataTypes.INTEGER
    },
    height:{
      type: DataTypes.INTEGER
    },
    weight:{
      type: DataTypes.INTEGER
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    idPoke: {
        type: DataTypes.STRING,
    },
    pokeNumber:{
      type:DataTypes.INTEGER
    },
    img:{
      type:DataTypes.TEXT               
    },
    type:{
      type:DataTypes.STRING
    }
  });
};
