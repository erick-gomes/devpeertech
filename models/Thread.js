import connection from '../config/database'
import sequelize from 'sequelize'

const { DataTypes } = sequelize

const thread = connection.define('threads', {
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    dislikes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    dateThread: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
})

export default thread
