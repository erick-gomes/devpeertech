import React from 'react'
import { getSession, signIn, signOut, useSession } from 'next-auth/client'

export default async function verifyServerSession (context) {
    const session = await getSession(context)
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    } else {
        return { session }
    }
}

export function verifySession () {
    const [session, loading] = useSession()
    if (!session) {
        try {
            if (location.pathname !== '/login') {
                React.useEffect(() => {
                    location.replace('/login')
                })
            }
        } catch (error) {
            console.error(error)
        }
    }
    return {
        session,
        loading,
        manager: [signIn, signOut]
    }
}
