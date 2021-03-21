import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import jose from 'node-jose'
import Central from '../../../models/Central'

const { Login } = Central

async function getKey () {
    return await jose.JWK.createKey('oct', 256, {
        alg: 'HS512',
        use: 'sig'
    })
}

let key
getKey().then(k => {
    key = k
})

export default NextAuth({
    pages: {
        signIn: '/login'
    },
    providers: [
        Providers.Credentials({
            name: 'DevPeerTech',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize (credentials) {
                if (!credentials.username || !credentials.password) return null
                const loginUser = await Login.findOne({
                    where: {
                        username: credentials.username,
                        senha: credentials.password
                    }
                })
                let user
                if (!loginUser) {
                    user = false
                } else {
                    const id = loginUser.dataValues.id
                    const username = loginUser.dataValues.username
                    user = { id, username }
                }

                if (user) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    jwt: {
        signingKey: key
    }
})
