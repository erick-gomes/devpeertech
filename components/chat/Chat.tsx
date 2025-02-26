import React from 'react'
import Image from 'next/image'

interface File {
    type: string;
    url: string;
}

export interface MessageProps {
    msg?: string;
    status: 'join' | 'leave' | 'message';
    file?: File;
}
interface RenderChatProps {
    chat: string[];
}

export function RenderChat({ chat }: RenderChatProps) {
    const final = chat.map(c => <>{c}</>)
    return final
}


export function Message({ msg, status, file }: MessageProps) {
    if (status === 'join') {
        return (
            <div className="d-flex justify-content-center mb-2">{`${msg} entrou`}</div>
        )
    } else if (status === 'leave') {
        return (
            <div className="d-flex justify-content-center mb-2">{`${msg} saiu`}</div>
        )
    } else if (status === 'message') {
        const type = file ? file.type : ''
        return (
            <>
                {type.includes('image') &&
                    <div className="d-flex justify-content-center mb-2">
                        <Image
                            width={300}
                            height={300}
                            alt="Ocorreu um erro ao carregar imagem."
                            src={file?.url || ''}
                        />
                    </div>
                }
                {type.includes('audio') &&
                    <div className="d-flex justify-content-center mb-2">
                        <audio controls>
                            <source src={file?.url || ''} type={type} />
                            Seu browser não suporta áudios.
                        </audio>
                    </div>
                }
                {type.includes('video') &&
                    <div className="d-flex justify-content-center mb-2">
                        <video width="320" height="240" controls>
                            <source src={file?.url || ''} type={type} />
                            Seu browser não suporta vídeos.
                        </video>
                    </div>
                }
                {msg && <div className="d-flex justify-content-center mb-2">{msg}</div>}
            </>
        )
    }
}
