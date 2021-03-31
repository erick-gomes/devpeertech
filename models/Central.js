import Login from './Login.js'
import Guest from './Guests.js'
import Estatistica from './Estatistica.js'
import Post from './Forum.js'
import Thread from './Thread.js'
import Travazap from './Travazap.js'

Login.hasOne(Guest, {
    as: 'guest',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
Login.hasMany(Post, {
    as: 'post',
    foreignKey: 'loginId',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
})
Post.belongsTo(Login)
Post.hasMany(Thread, {
    as: 'thread',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
Thread.belongsTo(Post, {
    as: 'post',
    onDelete: 'CASCADE'
})

export default { Login, Guest, Estatistica, Post, Thread, Travazap }
