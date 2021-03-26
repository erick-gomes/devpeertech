import React from 'react'
import Image from 'next/image'
import { signOut } from 'next-auth/client'
import Link from 'next/link'

export default function Nav () {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link href="/">
                <a className="navbar-brand">
                    <Image
                        src="/assets/images/logo.png"
                        width={60}
                        height={60}
                        className="d-inline-block align-top"
                        alt="DevPeer Tech"
                    />
                </a>
            </Link>
            <button className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link href="/"><a className="nav-link">Estatísticas</a></Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/forum"><a className="nav-link">Fórum</a></Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/"><a className="nav-link">Sobre</a></Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle"
                            href=""
                            id="navbarDropdownMenuLink"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false">
                            Opções
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <Link href="/forum/create"><a className="dropdown-item">Criar postagem</a></Link>
                            <Link href="/"><a className="dropdown-item">Minhas postagens</a></Link>
                            <div className="dropdown-divider"></div>
                            <Link href="/"><a className="dropdown-item">Meu perfil</a></Link>
                            <button style={{ cursor: 'pointer' }} className="dropdown-item btn btn-light" onClick={() => signOut()}>Sair</button>
                        </div>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2"
                        type="search"
                        name="s"
                        placeholder="Pesquisar"
                        aria-label="Pesquisar" />
                    <button className="btn btn-outline-light my-2 my-sm-0"
                        type="submit">Pesquisar</button>
                </form>
            </div>
        </nav>
    )
}
