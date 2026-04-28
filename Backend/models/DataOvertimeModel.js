import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const DataOvertime = db.define('data_overtime', {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    employee_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    nama_pegawai: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    overtime_date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hours: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(50),
        defaultValue: 'pending',
        allowNull: false
    }
}, {
    freezeTableName: true
});

export default DataOvertime;
