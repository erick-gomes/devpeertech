import React from 'react'
import verifySession from '../components/session/Session'
// import post from '../../styles/post.module.css'
// import styles from '../../styles/styles.module.css'

async function Login () {
    const s = verifySession()
    return (
        <div>
            <center>Logado como {s.session.user.username}</center>
        </div>
    )
}

export default Login
