import React from 'react'
import Nav from '../navigation/Nav'
import Link from 'next/link'

export default function Status404 () {
    return (
        <>
            <Nav />
            <div className="container-fluid text-center mt-5">
                <h1 style={{
                    color: '#ffffff'
                }}>Status 404</h1>
                <h2 className="mb-5" style={{
                    color: '#ffffff'
                }}>Not found</h2>
                <i style={{
                    color: '#ffffff',
                    fontSize: '20px'
                }}
                >Nenhuma postagem encontrada :(</i>
                <p style={{
                    color: '#ffffff',
                    fontSize: '20px'
                }}>Deseja voltar para <Link href="/forum"><a>tela inicial</a></Link>?</p>
            </div>
        </>
    )
}
