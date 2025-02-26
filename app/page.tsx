"use client"

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots, faPaperclip } from '@fortawesome/free-solid-svg-icons'
import {
    Container, Button, InputGroup,
    FormControl, Card, Row,
    Col, Form
} from 'react-bootstrap'
import io from 'socket.io-client'
import { Message, MessageProps } from '@/components/chat/Chat'
// import { input } from '../utils/inputs/input.js'
import Upload from '@/components/chat/Upload'
import { toast, ToastContainer } from 'react-toastify'
import $ from 'jquery'
import 'react-toastify/dist/ReactToastify.css'

export default function Home() {
    // states
    const [rendered, setRendered] = React.useState<React.ReactElement<MessageProps>[]>([])
    const [showUpload, setUpload] = React.useState(false)
    const [progress, setProgress] = React.useState(0)
    const [fileName, setFileName] = React.useState('mídia')
    const [showRow, setRow] = React.useState(2)
    // const toastId = React.useRef(null)

    // socket events
    React.useEffect(() => {
        // socket instance
        const socket = io()

        socket.on('all-users', ({ users, ips }) => {
            console.table({ users, ips })
        })

        socket.on('con', ({ id, ip }) => {
            const messages = rendered
            messages.push(<Message key={rendered.length} msg={id} status="join" />)
            const messagesJSX = messages.map(m => m)
            setRendered(messagesJSX)
        })

        socket.on('err', err => toast(err))

        socket.on('stream', (base64, type) => {
            const file = {
                url: `data:${type};base64,${base64}`,
                type
            }
            const messages = rendered
            messages.push(<Message file={file} key={rendered.length} status="message" />)
            const messagesJSX = messages.map(m => m)
            setRendered(messagesJSX)
        })

        socket.on('msg', ({ msg }) => {
            const messages = rendered
            messages.push(<Message key={rendered.length} msg={msg} status="message" />)
            const messagesJSX = messages.map(m => m)
            setRendered(messagesJSX)
        })

        socket.on('dc', dc => {
            const messages = rendered
            messages.push(<Message key={rendered.length} msg={dc} status="leave" />)
            const messagesJSX = messages.map(m => m)
            setRendered(messagesJSX)
        })

        const filesCustomStream = (file: File) => {
            let offset = 0
            const CHUNK_SIZE = 64 * 1024
            return new ReadableStream<Uint8Array>({
                start(controller) { },
                async pull(controller) {
                    if (offset >= file.size) {
                        controller.close()
                        return
                    }
                    const chunk = file.slice(offset, offset + CHUNK_SIZE)
                    controller.enqueue(new Uint8Array(await chunk.arrayBuffer()))
                    offset += CHUNK_SIZE
                },
                cancel() { }
            })
        }
        // event listeners
        $('#mediaSend').on('change', async (event) => {
            const arquivos = (event.target as HTMLInputElement).files
            if (!arquivos || !arquivos[0]) return
            const file = arquivos[0]
            setFileName(file.name)

            if (file.size > 104857600) {
                toast('Upload cancelado, arquivo muito grande')
                return
            }
            if (!(
                file.type.includes('image') ||
                file.type.includes('video') ||
                file.type.includes('audio')
            )) return toast('Arquivo não suportado')

            setUpload(true)
            const stream = filesCustomStream(file)
            const reader = stream.getReader()
            let size = 0
            while (true) {
                const { value, done } = await reader.read()
                if (done) {
                    socket.emit('bytes', false, file.type)
                    const timeSecond = 2
                    const afterTime = () => {
                        setUpload(false)
                    }
                    setTimeout(afterTime, Math.round(timeSecond * 1000))
                    return
                }
                size += value.byteLength
                const prog = Math.floor(size / file.size * 100)
                setProgress(prog)
                socket.emit('bytes', value)
            }
        })

        const sendMsg = () => {
            const sendMessage = document.getElementById('inputSend')
            const chat = document.getElementById('chat')
            if (!sendMessage) return
            const message = (sendMessage as HTMLInputElement).value
            if (message === '') return
            (sendMessage as HTMLInputElement).value = ''
            if (chat) {
                chat.scrollTop = chat.scrollHeight
            }
            socket.emit('message', { message })
        }

        $('#buttonSend').on('click', () => {
            sendMsg()
        })

        $('#inputSend').on('focus', () => {
            const timeout = 50
            setRow(3)
            setTimeout(() => {
                setRow(4)
                setTimeout(() => {
                    setRow(5)
                }, timeout)
            }, timeout)
        })

        $('#inputSend').on('focusout', () => {
            setRow(2)
        })

        /* $('#inputSend').on('keypress', (event) => {
            const command = input[event.key]
            if (command) {
                command({ sendMsg })
            }
        }) */

        return () => {
            socket.disconnect()
            console.log('Fast refresh effect')
        }
    }, [])
    const labelStyle = { margin: 0, padding: 0 }
    return (
        <Container fluid className="h-100">
            <ToastContainer />
            <Row>
                <Col>
                    <Upload
                        fileName={fileName}
                        show={showUpload}
                        now={progress}
                        label={`${progress}%`}
                    />
                </Col>
            </Row>
            <Row className="h-100">
                <Col>
                    <Card >
                        <Card.Body id="chat" className="scrollbar scrollbar-primary">
                            {rendered}
                        </Card.Body>
                        <Card.Footer>
                            <InputGroup>
                                <Form.Control
                                    type="file"
                                    id="mediaSend"
                                    accept="audio/*,video/*,image/*"
                                />

                                <Form.Label
                                    className="bg-primary"
                                    style={labelStyle}
                                    htmlFor="mediaSend"
                                >
                                    <FontAwesomeIcon icon={faPaperclip} />
                                </Form.Label>

                                <FormControl
                                    id="inputSend"
                                    placeholder="Digite alguma mensagem..."
                                    aria-label="Digite alguma mensagem..."
                                    aria-describedby="basic-addon2"
                                    as="textarea" rows={showRow}
                                />

                                <Button id="buttonSend">
                                    <FontAwesomeIcon icon={faCommentDots} />
                                </Button>
                            </InputGroup>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
