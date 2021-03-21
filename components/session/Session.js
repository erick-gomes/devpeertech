import { signIn, signOut, useSession } from 'next-auth/client'

export default async function verifySession () {
    const [session, loading] = useSession()
    if (!session) return signIn()
    return {
        session,
        loading,
        manager: [signIn, signOut]
    }
}
