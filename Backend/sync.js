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
