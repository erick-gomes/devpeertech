import connection from '../config/database'
import sequelize from 'sequelize'

const { DataTypes } = sequelize

const travazap = connection.define('travazaps', {
    contact: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_message: {
        type: DataTypes.STRING,
        allowNull: true
    },
    last_chat: {
        type: DataTypes.STRING,
        allowNull: true
    },
    msg_length: {
        type: DataTypes.STRING,
        allowNull: false
    },
    msg_length_ago: {
        type: DataTypes.STRING,
        allowNull: false
    },
    chat_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    chat_name_ago: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_created: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_ago: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default travazap
