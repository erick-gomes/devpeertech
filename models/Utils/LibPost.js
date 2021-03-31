// import Central from '../Central'

export async function searchPosts (search, r) {
    // const { Login } = Central
    const posts = []
    for (const post of search) {
        const {
            id,
            category,
            subject,
            content,
            likes,
            dislikes,
            datePost
        } = post.dataValues
        // const login = await Login.findOne({ where: { loginId } })
        const obj = await post.getLogin()
        const guest = obj.dataValues.username
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
                datePost,
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
                datePost,
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
