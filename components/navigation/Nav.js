import React from 'react'
import Image from 'next/image'

export default function Nav () {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">
                <Image
                    src="/assets/images/logo.png"
                    width={70}
                    height={60}
                    className="d-inline-block align-top"
                    alt="DevPeer Tech"
                />
            </a>
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
                    <li className="nav-item active">
                        <a className="nav-link" href="">Exército da Luz</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="?p=1">Estátisticas</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="?p=2">Fórum</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="?p=3">Sobre</a>
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
                            <a className="dropdown-item" href="?p=4">Criar postagem</a>
                            <a className="dropdown-item" href="?p=5">Minhas postagens</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="?p=6">Meu perfil</a>
                            <a className="dropdown-item" href="?p=0">Sair</a>
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
