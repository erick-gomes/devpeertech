"use client"

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots, faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { Container, Button, InputGroup, Card, Row, Col, Form } from 'react-bootstrap'
import io, { Socket } from 'socket.io-client'
import { Message, MessageProps } from '@/components/chat/Chat'
import Upload from '@/components/chat/Upload'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Home() {
    // states
    const [rendered, setRendered] = React.useState<React.ReactElement<MessageProps>[]>([])
    const [showUpload, setUpload] = React.useState(false)
    const [progress, setProgress] = React.useState(0)
    const [fileName, setFileName] = React.useState('mídia')
    const [showRow, setRow] = React.useState(1)
    // const toastId = React.useRef(null)
    const mediaSendRef = React.useRef<HTMLInputElement>(null)
    const inputSendRef = React.useRef<HTMLTextAreaElement>(null)
    const buttonSendRef = React.useRef<HTMLButtonElement>(null)
    // socket events
    const socket = React.useRef<Socket>(null)
    React.useEffect(() => {
        console.log('Instância do socket criada')
        socket.current = io()
        return () => {
            socket.current?.disconnect()
            console.log('Fast refresh effect and User disconnected')
        }
    }, [])
    React.useEffect(() => {
        console.log('Eventos restartados')
        if (!mediaSendRef.current ||
            !inputSendRef.current ||
            !buttonSendRef.current) {
            return
        }
        const mediaSend = mediaSendRef.current
        const inputSend = inputSendRef.current
        const buttonSend = buttonSendRef.current

        socket.current?.on('all-users', ({ users, ips }) => {
            console.table({ users, ips })
        })

        socket.current?.on('con', ({ id }) => {
            const messages = rendered
            messages.push(<Message key={rendered.length} msg={id} status="join" />)
            const messagesJSX = messages.map(m => m)
            setRendered(messagesJSX)
        })

        socket.current?.on('err', err => toast(err))

        socket.current?.on('stream', (base64, type) => {
            const file = {
                url: `data:${type};base64,${base64}`,
                type
            }
            const messages = rendered
            messages.push(<Message file={file} key={rendered.length} status="message" />)
            const messagesJSX = messages.map(m => m)
            setRendered(messagesJSX)
        })

        socket.current?.on('msg', ({ msg }) => {
            const messages = rendered
            messages.push(<Message key={rendered.length} msg={msg} status="message" />)
            const messagesJSX = messages.map(m => m)
            setRendered(messagesJSX)
        })

        socket.current?.on('dc', dc => {
            const messages = rendered
            messages.push(<Message key={rendered.length} msg={dc} status="leave" />)
            const messagesJSX = messages.map(m => m)
            setRendered(messagesJSX)
        })

        const filesCustomStream = (file: File) => {
            let offset = 0
            const CHUNK_SIZE = 64 * 1024
            return new ReadableStream<Uint8Array>({
                start() { },
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
        const handleChange = async (event: Event) => {
            const arquivos = (event.target as HTMLInputElement).files
            if (!arquivos || !arquivos[0]) return
            const file = arquivos[0]
            setFileName(file.name)
            const MAX_FILE_SIZE = 1024 * 1024 * 100
            if (file.size > MAX_FILE_SIZE) {
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
                    socket.current?.emit('bytes', false, file.type)
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
                socket.current?.emit('bytes', value)
            }
        }
        const handleClick = () => {
            const chat = document.getElementById('chat')
            if (inputSend.value === '') {
                return
            }
            if (chat) {
                chat.scrollTop = chat.scrollHeight
            }
            const message = inputSend.value
            socket.current?.emit('message', { message })
            inputSend.value = ''
        }
        const handleFocusOut = () => {
            setRow(1)
        }
        const handleKeyDown = (event: KeyboardEvent) => {
            const breakLines = inputSend.value.split('\n').length
            if (event.key === 'Enter' && breakLines < 5) {
                setRow(inputSend.rows + 1)
            }
            if (event.key === 'Backspace' &&
                breakLines <= 5 &&
                inputSend.value.endsWith('\n')
            ) {
                setRow(Math.max(inputSend.rows - 1, 1))
            }
        }
        mediaSend.addEventListener('change', handleChange)
        inputSend.addEventListener('focusout', handleFocusOut)
        buttonSend.addEventListener('click', handleClick)
        inputSend.addEventListener('keydown', handleKeyDown)
        return () => {
            socket.current?.removeAllListeners()
            mediaSend.removeEventListener('change', handleChange)
            inputSend.removeEventListener('focusout', handleFocusOut)
            buttonSend.removeEventListener('click', handleClick)
            inputSend.removeEventListener('keydown', handleKeyDown)
        }
    }, [rendered])
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
                    <Card>
                        <Card.Body id="chat" className="scrollbar scrollbar-primary">
                            {rendered}
                        </Card.Body>
                        <Card.Footer>
                            <InputGroup>
                                <Form.Group controlId="mediaSend">
                                    <Form.Label className="bg-primary">
                                        <FontAwesomeIcon icon={faPaperclip} />
                                    </Form.Label>
                                    <Form.Control
                                        type="file"
                                        ref={mediaSendRef}
                                        accept="audio/*,video/*,image/*"
                                    />
                                </Form.Group>

                                <Form.Control
                                    ref={inputSendRef}
                                    placeholder="Digite alguma mensagem..."
                                    aria-label="Digite alguma mensagem..."
                                    aria-describedby="basic-addon2"
                                    as="textarea" rows={showRow}
                                />

                                <Button ref={buttonSendRef}>
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
