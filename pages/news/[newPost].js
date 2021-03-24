import { useRouter } from 'next/router'
import React from 'react'
import Snip from '../../components/sniply/Snip'

function New ({ newPost }) {
    const router = useRouter()

    if (router.isFallback) {
        return <div style={{ textAlign: 'center' }}>Carregando novidades...</div>
    }
    return (
        <div>
            <p style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -100%)',
                fontSize: '30px',
                color: 'white'
            }}>Status 301</p>
            <h1 style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, 50%)',
                fontSize: '20px',
                color: 'white'
            }}>Deseja visitar essa página? então clique <a href={newPost}>aqui</a></h1>
            <Snip />
        </div>
    )
}

export async function getStaticPaths () {
    const res = await fetch('https://newsapi.org/v2/top-headlines?country=br&category=technology&apiKey=4491839497194fafb733f2502e18ef99')
    const resJson = await res.json()
    const paths = []
    if (resJson) {
        for (const key in resJson.articles) {
            paths.push({ params: { newPost: key } })
        }
    }
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps ({ params }) {
    const res = await fetch('https://newsapi.org/v2/top-headlines?country=br&category=technology&apiKey=4491839497194fafb733f2502e18ef99')
    const resJson = await res.json()
    if (!resJson) {
        return {
            notFound: true
        }
    }
    const newPost = resJson.articles[params.newPost]
    if (newPost) {
        return {
            props: { newPost: newPost.url },
            revalidate: 10
        }
    }
    return {
        notFound: true
    }
}

export default New
