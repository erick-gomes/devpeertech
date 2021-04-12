import React from 'react'
import Image from 'next/image'

export default function Message ({ msg, status, files }) {
    if (status === 'join') {
        return (
            <div className="d-flex justify-content-center mb-2">{`${msg} entrou`}</div>
        )
    } else if (status === 'leave') {
        return (
            <div className="d-flex justify-content-center mb-2">{`${msg} saiu`}</div>
        )
    } else if (status === 'message') {
        if (files) {
            let key = 0
            return (
                <>
                    {files.map(file => (
                            <div key={++key} className="d-flex justify-content-center mb-2">
                                <Image
                                    width={300}
                                    height={300}
                                    alt="Ocorreu um erro ao carregar imagem."
                                    src={file}
                                />
                            </div>
                    ))}
                    <div className="d-flex justify-content-center mb-2">{msg}</div>
                </>
            )
        }
        return (
            <div className="d-flex justify-content-center mb-2">{msg}</div>
        )
    }
    
}