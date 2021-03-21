/* eslint-disable react/prop-types */
import React from 'react'
import { csrfToken } from 'next-auth/client'
import styles from '../styles/styles.module.css'
import MessageError from '../components/error/MessageError'

function SignIn ({ csrfToken, query }) {
    let errorMessage
    if (query.error) errorMessage = query.error
    return (
        <div className={styles.container + ' container'} >
            <div className="row justify-content-md-center">
                <div className="col-md-5">
                    <div className="card" id={styles.formDiv}>
                        <div id={styles.formDiv2} className="p-4">
                            <h3 id="EL">DevPeer Tech</h3>
                            <MessageError error={errorMessage}/>
                            <form method='post' action='/api/auth/callback/credentials'>
                                <input name='csrfToken' type='hidden' defaultValue={csrfToken}/>
                                <div className="form-group">
                                    <input id="ipt"
                                        className="form-control credenciais"
                                        type="text"
                                        name="user"
                                        placeholder="Insira seu nome de usuário"
                                        maxLength="40"
                                        required />
                                </div>
                                <div className="form-group">
                                    <input id="ipt2"
                                        className="form-control credenciais"
                                        type="password"
                                        name="pwd"
                                        placeholder="Insira sua senha"
                                        maxLength="100"
                                        required />
                                </div>
                                <input id="ent"
                                    className="btn btn-success btn-block"
                                    type="submit" value="Entrar" />
                            </form>
                            <div className="text-center mt-3">
                                <p id={styles.cad}>Não tem conta?&nbsp;
                                    <a
                                        href="https://chat.whatsapp.com/FZKq9sZ9WICH7RapX9PNFU"
                                    >
                                        Entre no grupo do WhatsApp
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn

export async function getServerSideProps (context) {
    return {
        props: {
            csrfToken: await csrfToken(context),
            query: context.query
        }
    }
}
