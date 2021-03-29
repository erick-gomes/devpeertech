import connection from '../config/database'
import sequelize from 'sequelize'

const { DataTypes } = sequelize

const login = connection.define('logins', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default login
