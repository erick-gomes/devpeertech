import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots, faPaperclip } from '@fortawesome/free-solid-svg-icons'
import {
    Container, Button, InputGroup,
    FormControl, Card, Row,
    Col, FormFile, Form
} from 'react-bootstrap'
import io from 'socket.io-client'
import socketVerify from '../utils/socket/socket.js'
import { Message } from '../components/chat/Chat.js'
// import { input } from '../utils/inputs/input.js'
import Upload from '../components/chat/Upload.js'
import { toast, ToastContainer } from 'react-toastify'
import $ from 'jquery'
import ss from 'socket.io-stream'
import 'react-toastify/dist/ReactToastify.css'

export default function Home () {
    // states
    const [rendered, setRendered] = React.useState([])
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
            console.table(users)
            console.table(ips)
        })

        socket.on('con', ({ id, ip }) => {
            const messages = rendered
            messages.push(<Message key={rendered.length} msg={id} status="join"/>)
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
            messages.push(<Message file={file} key={rendered.length} status="message"/>)
            const messagesJSX = messages.map(m => m)
            setRendered(messagesJSX)
        })

        socket.on('msg', ({ msg }) => {
            const messages = rendered
            messages.push(<Message key={rendered.length} msg={msg} status="message"/>)
            const messagesJSX = messages.map(m => m)
            setRendered(messagesJSX)
        })

        socket.on('dc', dc => {
            const messages = rendered
            messages.push(<Message key={rendered.length} msg={dc} status="leave"/>)
            const messagesJSX = messages.map(m => m)
            setRendered(messagesJSX)
        })

        // event listeners
        $('#mediaSend').on('change', async (event) => {
            const arquivos = event.target.files
            if (!arquivos && !arquivos[0]) return
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
            const blobRead = ss.createBlobReadStream(file)

            let size = 0

            blobRead.on('data', (chunk) => {
                size += chunk.length
                const prog = Math.floor(size / file.size * 100)
                socket.emit('bytes', chunk)
                setProgress(prog)
            })

            blobRead.on('end', () => {
                socket.emit('bytes', false, file.type)
                const timeSecond = 2
                const afterTime = () => {
                    setUpload(false)
                }
                setTimeout(afterTime, Math.round(timeSecond * 1000))
            })
        })

        const sendMsg = () => {
            const sendMessage = document.getElementById('inputSend')
            const chat = document.getElementById('chat')
            const message = sendMessage.value
            if (message === '') return
            sendMessage.value = ''
            chat.scrollTop = chat.scrollHeight
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
            <Row className="justify-content-center h-100">
                <Col>
                    <Card>
                        <Card.Body id="chat" className="scrollbar scrollbar-primary">
                            {rendered}
                        </Card.Body>
                        <Card.Footer>
                            <InputGroup>
                                <FormFile.Input
                                    id="mediaSend"
                                    accept="audio/*,video/*,image/*"
                                />
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
                                    as="textarea" rows={showRow}
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
    try {
        await socketVerify(req, res)
    } catch (error) {
        console.error(error)
    }
    return {
        props: {

        }
    }
}
