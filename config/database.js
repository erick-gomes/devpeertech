import { Sequelize } from 'sequelize'

const connection = new Sequelize({
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    host: 'ec2-34-225-103-117.compute-1.amazonaws.com',
    username: 'oyajhdpjmfddgp',
    password: 'f9eb24f41740c1ef34bb43d6dbac0fc75935b5c8678ac3e7e118b14cb6b41e0a',
    database: 'd7t4d1grph7a62',
    define: {
        timestamps: true
    }
})
export default connection
