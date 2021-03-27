import React from 'react'
import styles from '../styles/styles.module.css'
import Nav from '../components/navigation/Nav'

export default function Sobre () {
    return (
        <>
            <Nav />
            <h3 id={styles.cmdH}>Comandos</h3>
            <ul className="list-group list-group-flush">
                <li className="m-1 rounded list-group-item text-white bg-primary nav-command">$update {'==>'} Atualizações e divulgações verificadas</li>
                <li className="m-1 rounded list-group-item text-white bg-success nav-command">$play {'==>'} Pesquisa um vídeo do YouTube e faz o download do áudio</li>
                <li className="m-1 rounded list-group-item text-white bg-danger nav-command">$sticker {'==>'} Converte imagens, gifs e vídeos em figurinha</li>
                <li className="m-1 rounded list-group-item text-white bg-secondary nav-command">$google {'==>'} Pesquisa algo no google e retorna os resultados</li>
                <li className="m-1 rounded list-group-item text-white bg-dark nav-command">$wiki {'==>'} Pesquisa uma entidade e retorna resultados</li>
                <li className="m-1 rounded list-group-item text-black bg-warning nav-command">$news {'==>'} Nossa newsletter sobre tecnologia para ficar ligado nas notícias</li>
            </ul>
        </>
    )
}
