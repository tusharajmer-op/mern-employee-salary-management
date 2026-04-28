import 'dotenv/config';
import db from './config/Database.js';
import DataOvertime from './models/DataOvertimeModel.js';

(async() => {
    await DataOvertime.sync();
    console.log("DataOvertime synced");
    process.exit();
})();
