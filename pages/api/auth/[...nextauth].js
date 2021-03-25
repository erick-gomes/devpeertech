import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Central from '../../../models/Central'

export default NextAuth({
    callbacks: {
        /**
         * @param  {object}  token     Decrypted JSON Web Token
         * @param  {object}  user      User object      (only available on sign in)
         * @param  {object}  account   Provider account (only available on sign in)
         * @param  {object}  profile   Provider profile (only available on sign in)
         * @param  {boolean} isNewUser True if new user (only available on sign in)
         * @return {object}            JSON Web Token that will be saved
         */
        async jwt (token, user, account, profile, isNewUser) {
            if (account?.accessToken) {
                token.accessToken = account.accessToken
            }
            const tokenSend = {
                ...token,
                ...user
            }
            return tokenSend
        },
        /**
        * @param  {object} session      Session object
        * @param  {object} token        User object    (if using database sessions)
        *                               JSON Web Token (if not using database sessions)
        * @return {object}              Session that will be returned to the client
        */
        async session (session, token) {
            session.accessToken = token.accessToken
            const sessionSend = {
                ...token,
                expires: session.expires
            }
            return sessionSend
        }
    },
    pages: {
        signIn: '/login'
    },
    name: 'DevPeerTech',
    credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
    },
    providers: [
        Providers.Credentials({
            async authorize (credentials) {
                const { Login } = Central
                if (!credentials.username || !credentials.password) return null
                const loginUser = await Login.findOne({
                    where: {
                        username: credentials.username,
                        senha: credentials.password
                    }
                })
                if (!loginUser) {
                    return null
                } else {
                    const id = loginUser.dataValues.id
                    const username = loginUser.dataValues.username
                    const user = { id, username }
                    return user
                }
            }
        })
    ],
    jwt: {
        signingKey: process.env.JWT_TOKEN
    }
})
