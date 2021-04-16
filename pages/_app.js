import React from 'react'
import '../style/index.css'

export default function MyApp ({ Component, pageProps }) {
    return (
        <React.StrictMode>
            <Component {...pageProps} />
        </React.StrictMode>
    )
}
