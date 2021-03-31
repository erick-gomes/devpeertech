import React from 'react'
import verifyServerSession from '../../components/session/Session'
import fs from 'fs'
import path from 'path'
import postagem from '../../styles/post.module.css'
import Nav from '../../components/navigation/Nav'

export default function CreatePost ({ category, query }) {
    let sucesso
    let erro
    if (query.success) {
        sucesso = 'Sua postagem foi publicada com sucesso!'
    }

    switch (query.error) {
    case 'catinvalid':
        erro = 'Categoria inválida!'
        break
    case 'undefined':
        erro = 'Preencha todos os campos!'
        break
    case 'submax':
        erro = 'Seu assunto precisa ter menos de 50 caracteres'
        break
    case 'submin':
        erro = 'Seu assunto precisa ter mais de 5 caracteres'
        break
    case 'contmax':
        erro = 'Seu assunto precisa ter menos de 60.000 caracteres'
        break
    case 'contmin':
        erro = 'Seu assunto precisa ter mais de 50 caracteres'
        break
    }

    React.useEffect(() => {
        $(() => {
            $('[data-toggle="tooltip"]').tooltip()
            /* tinymce.init({ selector:'textarea' }) */
        })
    })
    return (
        <>
            <Nav />
            {sucesso && <div id={postagem.alertError} className="alert alert-success text-center mt-4">{sucesso}</div>}
            {erro && <div id={postagem.alertError} className="alert alert-danger text-center mt-4">{erro}</div>}

            <div className={postagem.postagem + ' container-fluid'}>
                <div className="row">
                    <div className="col-sm-12">
                        <form className="needs-validation" noValidate action="/api/post" method="post">
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Assunto:</span>
                                </div>
                                <input data-toggle="tooltip"
                                    data-placement="top"
                                    title="Adicione um assunto"
                                    type="text" name="subject"
                                    className="form-control" id="assuntoInfo"
                                    placeholder="Sua dúvida aqui"
                                    maxLength="100" required />
                            </div>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <label className="input-group-text" htmlFor="categoriaInfo">Categoria:</label>
                                </div>
                                <select data-toggle="tooltip"
                                    data-placement="top"
                                    title="Escolha sua categoria"
                                    name="category" className="form-control custom-select"
                                    id="categoriaInfo" required>
                                    <option value="Escolher...">Escolher...</option>
                                    {category.map(cat => (
                                        <option key={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <textarea data-toggle="tooltip"
                                    placeholder="Conteúdo:"
                                    data-placement="top"
                                    title="Adicione um conteúdo"
                                    name="content" className="form-control" id="contentInfo" rows="10"
                                    maxLength="60000" required></textarea>
                            </div>
                            <input className="btn btn-block btn-primary" type="submit" value="Publicar" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps (context) {
    try {
        const r = await verifyServerSession(context)
        if (r.redirect) {
            return { redirect: r.redirect }
        }

        const directory = path.resolve(process.cwd(), 'images')
        const categorias = fs.readdirSync(directory)
        const category = []
        for (const categoria of categorias) {
            category.push(categoria.replace('.png', ''))
        }

        return {
            props: {
                category,
                query: context.query
            }
        }
    } catch (error) {
        console.error(error)
        return {
            notFound: true
        }
    }
}
