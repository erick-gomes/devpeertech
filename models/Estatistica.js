import connection from '../config/database'
import sequelize from 'sequelize'
const { DataTypes } = sequelize

const estatistica = connection.define('estatisticas', {
    total_msg: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    total_users: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    total_join: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    total_left: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    total_links: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    total_media: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    total_trv: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    total_flood: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
})
export default estatistica
