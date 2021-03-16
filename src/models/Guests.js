import connection from '../config/database.js'
import sequelize from 'sequelize'

const { DataTypes } = sequelize

const guest = connection.define('guests', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    total_user_msg: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    total_media_msg: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    total_link_msg: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
})

export default guest
