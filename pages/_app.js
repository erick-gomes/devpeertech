import React from 'react'
import { Provider } from 'next-auth/client'
import '../styles/globals.css'
import Head from 'next/head'
import Footer from '../components/navigation/Footer'

export default function MyApp ({ Component, pageProps }) {
    return (
        <Provider session={pageProps.session}>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <link rel="stylesheet" type="text/css" href="/assets/datatables/datatables.min.css"/>
                <title>DevPeerTech</title>
            </Head>
            <Component {...pageProps} />
            <Footer />
        </Provider>
    )
}
