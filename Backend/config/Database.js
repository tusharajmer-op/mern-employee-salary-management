import { Sequelize } from 'sequelize';

const db = new Sequelize(process.env.DATABASE_URL,{dialect:'mysql'});

export default db;