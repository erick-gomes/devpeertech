import React from 'react'
import styles from '../../styles/styles.module.css'

export default function EventError () {
    React.useEffect(() => {
        const entId = document.getElementById('ent')
        const getInterval = setInterval(() => {
            const snipSpace = document.getElementById('body-index')
            if (snipSpace) {
                if (snipSpace.getAttribute('style')) {
                    snipSpace.setAttribute('style', '')
                } else {
                    console.log('nao existe')
                    clearInterval(getInterval)
                }
            } else {
                clearInterval(getInterval)
            }
        }, 1000)
        entId.addEventListener('click', function () {
            const frm = document.getElementById(styles.formDiv)
            const frm2 = document.getElementById(styles.formDiv2)
            let index = 0
            const interval = setInterval(() => {
                entId.setAttribute('disabled', 'true')
                index++
                frm.style.boxShadow = `2px 2px 10px ${index}px white`
                frm2.style.boxShadow = `2px 2px 10px ${index}px black inset`
                if (index === 50) {
                    const el = document.getElementById('EL')
                    const ipt = document.getElementById('ipt')
                    const ipt2 = document.getElementById('ipt2')
                    const cad = document.getElementById(styles.cad)
                    el.style.color = '#28a745'
                    el.style.textShadow = '3px 3px 2px'
                    ipt.style.backgroundColor = '#f5f6f7'
                    ipt2.style.backgroundColor = '#f5f6f7'
                    cad.style.color = 'white'
                }
                const w = window.outerWidth
                const h = window.outerHeight
                let time = 0
                if (w > h) { time = w } else { time = h }
                if (index >= time) {
                    clearInterval(interval)
                    entId.removeAttribute('disabled')
                }
            }, 10)
        })
    })
    return <script></script>
}
