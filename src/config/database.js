import { Sequelize } from 'sequelize'

const connection = new Sequelize({
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    host: 'ec2-52-71-231-37.compute-1.amazonaws.com',
    username: 'sbyqtvqvptfzuo',
    password: '683a11b5e66a697c6adfc76a6474d69433bfe289b048a54ea19c4dfde1cce12e',
    database: 'd97h7d7pvhpfh5',
    define: {
        timestamps: true
    }
})
export default connection
