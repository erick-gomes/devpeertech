import React from 'react'
import { render } from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots, faPaperclip } from '@fortawesome/free-solid-svg-icons'
import {
    Container, Button, InputGroup,
    FormControl, Card, Row,
    Col, FormFile, Form
} from 'react-bootstrap'
import io from 'socket.io-client'
import socketVerify from '../utils/socket/socket.js'
import Message from '../components/chat/Chat.js'
import { input } from '../utils/inputs/input.js'
import Upload from '../components/chat/Upload.js'

export default function Home () {
    // states
    const [progress, setProgress] = React.useState(0)
    const [showModal, setShowModal] = React.useState(false)

    // DOM
    React.useEffect(() => {
        require('bootstrap')

        // socket instance
        const socket = io()

        socket.on('all-users', ({ users, ips }) => {
            console.table(users)
            console.table(ips)
        })

        socket.once('connect', () => {
            socket.emit('connect-server')
        })

        const rendered = []
        socket.on('con', ({ id, ip }) => {
            const message = <Message key={rendered.length} msg={id} status="join"/>
            rendered.push(message)
            render(
                <>{rendered}</>,
                document.getElementById('chat')
            )
        })

        socket.on('msg', ({ msg, files }) => {
            const key = rendered.length
            const message = <Message key={key} id={key} msg={msg} files={files} status="message"/>
            rendered.push(message)
            render(
                <>{rendered}</>,
                document.getElementById('chat')
            )
        })

        socket.on('dc', dc => {
            const message = <Message key={rendered.length} msg={dc} status="leave"/>
            rendered.push(message)
            render(
                <>{rendered}</>,
                document.getElementById('chat')
            )
        })

        // event listeners
        const mSend = document.getElementById('mediaSend')
        const files = []
        if (mSend) {
            mSend.addEventListener('change', async event => {
                const reader = new FileReader()
                const arquivos = event.target.files || []
                setShowModal(true)
                for (const file of arquivos) {
                    reader.addEventListener('progress', ({ loaded, total }) => {
                        if (loaded && total) {
                            const percent = (loaded / total) * 100
                            setProgress(Math.round(percent))
                        }
                    })
                    reader.readAsDataURL(file)
                    reader.onload = e => {
                        files.push({
                            base64url: e.target.result,
                            size: file.size,
                            mimetype: file.type
                        })
                    }
                }
                await new Promise(resolve => setTimeout(() => resolve(), 2000))
                setShowModal(false)
            })
        }

        const btnSend = document.getElementById('buttonSend')
        const sendMessage = document.getElementById('inputSend')
        const chat = document.getElementById('chat')
        if (btnSend && sendMessage && chat) {
            const sendMsg = () => {
                const message = sendMessage.value
                sendMessage.value = ''
                chat.scrollTop = chat.scrollHeight
                socket.emit('message', { message, files })
            }
            btnSend.addEventListener('click', sendMsg)
            sendMessage.addEventListener('keypress', event => {
                const i = input[event.key]
                if (i) {
                    i({
                        sendMsg
                    })
                }
            })
        }
        // fechar conexão
        return () => {
            socket.disconnect()
        }
    })
    const labelStyle = { margin: 0, padding: 0 }
    return (
        <Container fluid className="h-100">
            <Row>
                <Col>
                    <Upload show={showModal} now={progress} label={`${progress}%`}/>
                </Col>
            </Row>
            <Row className="justify-content-center h-100">
                <Col>
                    <Card>
                        <Card.Body id="chat" className="scrollbar scrollbar-primary"/>
                        <Card.Footer>
                            <InputGroup>
                                <FormFile.Input id="mediaSend" accept="audio/*,video/*,image/*"/>
                                <InputGroup.Append>
                                    <Form.Label
                                        className="bg-primary"
                                        style={labelStyle}
                                        htmlFor="mediaSend"
                                    >
                                        <FontAwesomeIcon icon={faPaperclip} />
                                    </Form.Label>
                                </InputGroup.Append>
                                <FormControl
                                    id="inputSend"
                                    placeholder="Digite alguma mensagem..."
                                    aria-label="Digite alguma mensagem..."
                                    aria-describedby="basic-addon2"
                                    as="textarea" rows={2}
                                />
                                <InputGroup.Append>
                                    <Button id="buttonSend">
                                        <FontAwesomeIcon icon={faCommentDots} />
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export async function getServerSideProps ({ req, res }) {
    socketVerify(req, res)
    return {
        props: {

        }
    }
}
