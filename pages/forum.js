/* eslint-disable camelcase */
import React from 'react'
import verifyServerSession from '../components/session/Session'
// import postagem from '../styles/post.module.css'
import Nav from '../components/navigation/Nav'
import Central from '../models/Central'
import { Op } from 'sequelize'
import Image from 'next/image'
import Link from 'next/link'
// import Snip from '../components/sniply/Snip'

async function searchPosts (search, r) {
    const posts = []
    for (const post of search) {
        const {
            id,
            guest,
            category,
            subject,
            content,
            likes,
            dislikes,
            date_post
        } = post.dataValues
        const image = await (await fetch(`${process.env.NEXTAUTH_URL}/api/image/${category}`)).json()
        if (image.status !== '200') {
            posts.push({
                id,
                guest,
                category,
                subject,
                content,
                likes,
                dislikes,
                date_post,
                image: '/assets/images/category.png'
            })
        } else {
            posts.push({
                id,
                guest,
                category,
                subject,
                content,
                likes,
                dislikes,
                date_post,
                image: image.base64
            })
        }
    }
    return {
        props: {
            session: r.session,
            posts
        }
    }
}

export default function Forum ({ posts }) {
    if (posts.status) {
        if (posts.status === '404') {
            return (
                <>
                    <Nav />
                    <div className="container-fluid">
                        <i style={{ color: '#ffffff' }}
                        >Nenhuma postagem encontrada :(</i>
                    </div>
                </>
            )
        }
    }
    return (
        <>
            <Nav />
            <div className="container-fluid">
                {posts.map(post => (
                    <div key={post.id} className="row bg-light border border-dark p-3">
                        <div className="col-sm-2">
                            <div className="text-center mb-1">{post.category}</div>
                            <div className="text-center">
                                <Image
                                    src={post.image}
                                    width={60}
                                    height={60}
                                    alt=":("
                                />
                            </div>
                        </div>
                        <div className="col-sm-10">
                            <div className="text-truncate mb-2">
                                <Link href={`/forum/${post.id}`}>
                                    <a>{post.subject}</a>
                                </Link>
                            </div>
                            <div className="text-truncate">{post.content}</div>
                            <div className="mt-3" style={{
                                fontSize: '12px'
                            }}><i>{`${post.date_post} por ${post.guest}`}</i></div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export async function getServerSideProps (context) {
    const r = await verifyServerSession(context)
    if (r.redirect) {
        return { redirect: r.redirect }
    }

    const { Post } = Central
    if (context.query.s) {
        const search = await Post.findAll({
            order: [['createdAt', 'DESC']],
            limit: 15,
            where: {
                [Op.or]: {
                    subject: {
                        [Op.iLike]: `%${context.query.s}%`
                    },
                    category: {
                        [Op.iLike]: `${context.query.s}%`
                    }
                }
            }
        })
        if (search[0]) {
            try {
                return await searchPosts(search, r)
            } catch (error) {
                return {
                    notFound: true
                }
            }
        }
    } else {
        const search = await Post.findAll({ order: [['createdAt', 'DESC']], limit: 15 })
        if (search[0]) {
            try {
                return await searchPosts(search, r)
            } catch (error) {
                return {
                    notFound: true
                }
            }
        }
    }
    return {
        props: {
            session: r.session,
            posts: {
                status: '404'
            }
        }
    }
}
