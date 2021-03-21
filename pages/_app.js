/* eslint-disable react/prop-types */
import React from 'react'
import Head from 'next/head'
import { Provider } from 'next-auth/client'
import '../styles/globals.css'
import Footer from '../components/navigation/Footer'

export default function MyApp ({ Component, pageProps }) {
    return (
        <Provider session={pageProps.session}>
            <Head>
                <link rel="stylesheet" href="/assets/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="/assets/css/datatables.min.css"/>
            </Head>
            <Component {...pageProps} />
            <Footer />
        </Provider>
    )
}
