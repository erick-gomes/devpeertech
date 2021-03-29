import connection from '../config/database'
import sequelize from 'sequelize'
const { DataTypes } = sequelize

const post = connection.define('posts', {
    category: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    condition: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: 'open'
    },
    subject: {
        type: DataTypes.STRING(120),
        allowNull: false
    },
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
    datePost: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
})
export default post
