import React from 'react'
import { ProgressBar, Modal } from 'react-bootstrap'

export default function Upload (props) {
    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            animation={false}
            keyboard={false}
            show={props.show}>
            <Modal.Header>
                <Modal.Title>Carregando mídia...</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ProgressBar animated now={props.now} label={props.label} />
            </Modal.Body>
        </Modal>
    )
}
