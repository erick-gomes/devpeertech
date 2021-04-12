import React from 'react'
import { render } from 'react-dom'
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome'
import { faCommentDots, faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { 
    Container, Button, InputGroup, 
    FormControl, Card, Row, 
    Col, FormFile, Form
} from 'react-bootstrap'
import io from 'socket.io-client'
import socketVerify from '../components/socket/Socket.js'
import Message from '../components/chat/Chat.js'

export default function Home () {
    React.useEffect(() => {
        const socket = io()
    
        socket.on('all-users', users => {
            console.log(users)
        })

        const rendered = []
        socket.on('con', ({ id, ip }) => {
            console.log(ip)
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
        const errors = []
        if (mSend) {
            mSend.addEventListener('change', event => {
                console.log(event.target.files)
                const reader = new FileReader()
                for (const file of event.target.files) {
                    const type = file.type
                    if (!(
                        type.includes('audio') || 
                        type.includes('image') ||
                        type.includes('video')
                    )) {
                        errors.push('type-not-allow')
                        break
                    }
                    if (file.size > 104857600) {
                        errors.push('max-size')
                        break
                    }
                    reader.readAsDataURL(file)
                    reader.onload = e => {
                        files.push(e.target.result)
                    }
                }
                
            })
        }

        const btnSend = document.getElementById('buttonSend')
        if (btnSend) {
            btnSend.addEventListener('click', () => {
                const sendMessage = document.getElementById('inputSend')
                const chat = document.getElementById('chat')
                const message = sendMessage.value

                if (files && files[0]) {
                    socket.emit('message', { message, errors, files })
                    errors.map(() => errors.pop())
                } else {
                    socket.emit('message', { message }) 
                }
                
                sendMessage.value = ''
                chat.scrollTop = chat.scrollHeight
            })
        }
    })
    const labelStyle = { margin: 0, padding: 0 }
    return (
        <Container fluid className="h-100">
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
