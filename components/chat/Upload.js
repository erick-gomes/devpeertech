import React from 'react'
import { Modal, ProgressBar } from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css'

/**
 *
 * @param {{show:Boolean,now:Number,label:String,fileName:String}} param0 props
 * @returns React Component
 */
export default function Upload ({ show, now, label, fileName }) {
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
            <Modal.Body><ProgressBar animated now={now} label={label}/></Modal.Body>
        </Modal>
    )
}
