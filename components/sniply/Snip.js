import React from 'react'

export default function Snip () {
    React.useEffect(() => {
        const getInterval = setInterval(() => {
            const snipSpace = document.getElementById('body-index')
            if (snipSpace) {
                if (snipSpace.getAttribute('style')) {
                    snipSpace.setAttribute('style', '')
                } else {
                    clearInterval(getInterval)
                }
            } else {
                clearInterval(getInterval)
            }
        }, 1000)
    })
    return (
        <script type="text/javascript" src="https://gosniply.com/site/60592eed2a4ad342106544d8.js"></script>
    )
}
