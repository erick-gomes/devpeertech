/* eslint-disable camelcase */
export async function searchPosts (search, r) {
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
        const categoryOut = encodeURIComponent(category)
        const image = await (await fetch(`${process.env.NEXTAUTH_URL}/api/image/${categoryOut}`)).json()
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
    if (r) {
        return {
            props: {
                session: r.session,
                posts
            }
        }
    }
    return {
        props: {
            posts
        }
    }
}
