import React from 'react'
import axios from 'axios'
import env from './Utils/Env.js'

function App () {
    axios.get(env()).then(res => {
        console.log(res.data)
    })
    return (
        <div className="App">
            <center>Testando React</center>
        </div>
    )
}

export default App
