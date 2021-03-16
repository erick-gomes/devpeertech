import React from 'react'

function Home () {
    return (
        <div>
            <h1>Home</h1>
            <Contador />
        </div>
    )
}

function Contador () {
    const [contador, setContador] = React.useState(1)
    function adicionarContador () {
        setContador(contador + 1)
    }
    return (
        <div>
            <div>{contador}</div>
            <button onClick={adicionarContador}>Adicionar Contador</button>
        </div>
    )
}

export default Home
