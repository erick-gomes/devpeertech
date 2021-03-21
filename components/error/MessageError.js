import React from 'react'
/* eslint-disable react/prop-types */
export default function MessageError (props) {
    console.log(props)
    if (props.children) {
        return (
            <div className="alert alert-danger">{props.children}</div>
        )
    }
    return <></>
}
