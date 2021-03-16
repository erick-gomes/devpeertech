import connection from '../config/database.js'
import sequelize from 'sequelize'
const { DataTypes, literal } = sequelize

const post = connection.define('posts', {
    guest: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'Anônimo'
    },
    category: {
        type: DataTypes.STRING(50),
        allowNull: false
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
    date_post: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    createdAt: {
        type: 'TIMESTAMPTZ',
        defaultValue: literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    updatedAt: {
        type: 'TIMESTAMPTZ',
        defaultValue: literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
    /* CONCAT(EXTRACT(DAY FROM CURRENT_DATE), '-', EXTRACT(MONTH FROM CURRENT_DATE), '-', EXTRACT(YEAR FROM CURRENT_DATE)) */
})
export default post
