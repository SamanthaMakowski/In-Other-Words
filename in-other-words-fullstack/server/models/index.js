import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import config from '../config/config.js';

dotenv.config();

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const configEnv = config[env];
const db = {};

let sequelize;
if (configEnv.use_env_variable) {
  sequelize = new Sequelize(process.env[configEnv.use_env_variable], configEnv);
} else {
  sequelize = new Sequelize(configEnv.database, configEnv.username, configEnv.password, configEnv);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file)).default(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export { sequelize };  
export default db;
