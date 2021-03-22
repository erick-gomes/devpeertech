import React from 'react'
import ErrorAlert from './ErrorAlert'

export default function MessageError ({ error }) {
    const [alerta, setAlerta] = React.useState(error)
    const [messageAlert, setMessageAlert] = React.useState('alert alert-danger')
    setTimeout(() => {
        setAlerta('')
        setMessageAlert('')
    }, 5000)
    if (error) {
        return (
            <ErrorAlert classe={messageAlert}>{alerta}</ErrorAlert>
        )
    }
    return <div></div>
}
