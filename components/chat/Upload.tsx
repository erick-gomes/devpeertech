import React from 'react'
import { Modal, ProgressBar } from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css'

export default function Upload({ show, now, label, fileName }: { show: boolean; now: number; label: string; fileName: string }) {
    return (
        <Modal
            animation={false}
            centered={true}
            show={show}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header className={'text-center'}>
                Carregando {fileName}
            </Modal.Header>
            <Modal.Body><ProgressBar animated now={now} label={label} /></Modal.Body>
        </Modal>
    )
}
