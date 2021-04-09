import React from 'react'
import socketVerify from '../components/socket/Socket.js'
import { Container } from 'react-bootstrap'
import io from 'socket.io-client'

export default function Home () {
    React.useEffect(() => {
        const socket = io()
    
        socket.on('all-users', users => {
            console.log(users)
        })

        socket.on('con', id => {
            document.write(`<center>${id} entrou</center>`)
        })

        socket.on('dc', dc => {
            document.write(`<center>${dc} saiu</center>`)
        })
    })
    return (
        <Container>
            
        </Container>
    )
}

export async function getServerSideProps ({ res }) {
    socketVerify(res)
    return {
        props: {

        }
    }
}
