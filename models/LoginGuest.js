import connection from '../config/database.js'
import sequelize from 'sequelize'

const { DataTypes } = sequelize

const LoginGuest = connection.define('LoginGuests', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    loginId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'logins', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    guestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'guests', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
})

export default LoginGuest
