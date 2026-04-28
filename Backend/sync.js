// added to make custom migration for DataOvertime table, since this repo has a sql dump
import 'dotenv/config';
import db from './config/Database.js';
import Overtime from './models/OvertimeModel.js';
(async () => {
  try {
    await Overtime.sync();
    console.log("Table created!");
    process.exit(0);
  } catch (error) {
    console.error(error);
  }
})();
