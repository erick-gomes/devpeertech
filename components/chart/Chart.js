import React from 'react'
import styles from '../../styles/styles.module.css'

export default function Chart () {
    /* eslint-disable no-undef */
    /**
     * @param {boolean} loadRemove Carregar ou não pre-load
     * @param {boolean} isMobile Determina se é móvel ou não
     * @return {function} Retorna função do gráfico
     */
    function loadChart (loadRemove, isMobile) {
        google.charts.load('current', { packages: ['corechart', 'gauge', 'bar'] })
        google.charts.setOnLoadCallback(() => {
            const options =
        {
            title: 'Gráfico do total de mídia e links',
            is3D: true,
            height: 300,
            legend: {
                position: 'left',
                textStyle: {
                    color: 'white',
                    fontSize: 14,
                    bold: false,
                    italic: true
                }
            },
            backgroundColor: 'black',
            titleTextStyle: {
                color: 'white',
                fontSize: 16,
                bold: false,
                italic: false
            }
        }

            const xmlh = new XMLHttpRequest()
            xmlh.onreadystatechange = () => {
                if (xmlh.readyState === 4 && xmlh.status === 200) {
                    const data = JSON.parse(xmlh.responseText)
                    const dataView = new google.visualization.DataTable()
                    dataView.addColumn('string', 'Tipo')
                    dataView.addColumn('number', 'Mensagens')
                    dataView.addRows([
                        ['Links', data.links],
                        ['Mídia', data.media]
                    ])
                    const ch = document.getElementById(styles.chart_div)
                    if (!ch) return
                    const chart = new google.visualization.PieChart(ch)
                    chart.draw(dataView, options)
                    if (loadRemove) {
                        const preload = document.getElementById(styles.pre1)
                        if (preload) preload.remove()
                    }
                }
            }
            xmlh.open('GET', '/api/chart/1')
            xmlh.send()
        })
        //= ======================================================================================
        google.charts.setOnLoadCallback(() => {
            const options2 =
        {
            title: 'Gráfico de travas e flood detectados',
            colors: [
                'rgb(3, 199, 124)',
                'rgb(110, 0, 253)'
            ],
            is3D: true,
            height: 300,
            legend: {
                position: 'left',
                textStyle: {
                    color: 'white',
                    fontSize: 14,
                    bold: false,
                    italic: true
                }
            },
            backgroundColor: 'black',
            titleTextStyle: {
                color: 'white',
                fontSize: 16,
                bold: false,
                italic: false
            }
        }
            const xmlh2 = new XMLHttpRequest()
            xmlh2.onreadystatechange = () => {
                if (xmlh2.readyState === 4 && xmlh2.status === 200) {
                    const data2 = JSON.parse(xmlh2.responseText)
                    const dataView2 = new google.visualization.DataTable()
                    dataView2.addColumn('string', 'Tipo')
                    dataView2.addColumn('number', 'Mensagens Proibidas')
                    dataView2.addRows([
                        ['Travas', data2.trava],
                        ['Flood', data2.flood]
                    ])
                    const ch2 = document.getElementById(styles.chart_div2)
                    if (!ch2) return
                    const chart2 = new google.visualization.PieChart(ch2)
                    chart2.draw(dataView2, options2)
                    if (loadRemove) {
                        const preload2 = document.getElementById(styles.pre2)
                        if (preload2) preload2.remove()
                    }
                }
            }
            xmlh2.open('GET', '/api/chart/2')
            xmlh2.send()
        })
        //= ======================================================================================================
        google.charts.setOnLoadCallback(() => {
            const options3 = {
                width: 500,
                height: 120,
                redFrom: 90,
                redTo: 100,
                yellowFrom: 75,
                yellowTo: 90,
                minorTicks: 5
            }
            const xmlh3 = new XMLHttpRequest()
            xmlh3.onreadystatechange = () => {
                if (xmlh3.readyState === 4 && xmlh3.status === 200) {
                    const data3 = JSON.parse(xmlh3.responseText)
                    const dataView3 = google.visualization.arrayToDataTable([
                        ['Label', 'Value'],
                        ['Memória', data3.memory],
                        ['CPU', data3.cpu],
                        ['Internet', data3.network]
                    ])
                    const ch3 = document.getElementById(styles.chart_div3)
                    if (!ch3) return
                    const chart3 = new google.visualization.Gauge(ch3)
                    chart3.draw(dataView3, options3)
                    document.getElementById(styles.infoSys).innerText = 'Informações do Sistema'
                    if (loadRemove) {
                        const preload3 = document.getElementById(styles.pre3)
                        if (preload3) preload3.remove()
                    }
                    setInterval(() => {
                        let dataReq
                        const res = new XMLHttpRequest()
                        res.onreadystatechange = () => {
                            if (res.readyState === 4 && res.status === 200) {
                                dataReq = JSON.parse(res.responseText)
                                dataView3.setValue(0, 1, dataReq.memory)
                                dataView3.setValue(1, 1, dataReq.cpu)
                                dataView3.setValue(2, 1, dataReq.network)
                                chart3.draw(dataView3, options3)
                            }
                        }
                        res.open('GET', '/api/chart/3')
                        res.send()
                    }, 60000)
                }
            }
            xmlh3.open('GET', '/api/chart/3')
            xmlh3.send()
        })
        google.charts.setOnLoadCallback(() => {
            const options4 = {
                legend: { position: 'none' },
                bars: 'horizontal',
                axes: {
                    x: {
                        0: { side: 'top', label: 'Total de mensagens de cada usuário', labelColor: '#ffffff' }
                    }
                },
                bar: { groupWidth: '50%' },
                backgroundColor: { fill: '#000000' },
                chartArea: { backgroundColor: '#000000' },
                titleTextStyle: { color: '#ffffff' },
                vAxis: { textStyle: { color: '#ffffff', fontSize: '12' } },
                hAxis: { textStyle: { color: '#ffffff', fontSize: '16' } }
            }
            const xmlh4 = new XMLHttpRequest()
            xmlh4.onreadystatechange = () => {
                if (xmlh4.readyState === 4 && xmlh4.status === 200) {
                    const dataView4 = new google.visualization.DataTable()
                    const data4 = JSON.parse(xmlh4.responseText)
                    dataView4.addColumn({ type: 'string', id: 'categoria' })
                    dataView4.addColumn({ type: 'number', id: 'msgs' })
                    for (const user of data4) {
                        dataView4.addRows([[user.username, user.total_user_msg]])
                    }
                    const ch4 = document.getElementById(styles.chart_div4)
                    if (!ch4) return
                    const chart4 = new google.charts.Bar(ch4)
                    if (!isMobile) {
                        chart4.draw(dataView4, google.charts.Bar.convertOptions(options4))
                    }
                    if (loadRemove) {
                        const preload4 = document.getElementById(styles.pre4)
                        if (preload4) preload4.remove()
                    }
                }
            }
            xmlh4.open('GET', '/api/chart/4')
            xmlh4.send()
        })
    }
    React.useEffect(() => {
        $(document).ready(() => {
            loadChart(true, false)
        })
        $(window).resize(() => {
            loadChart(false, false)
        })
    })
    return (
        <script src="/assets/chart/loader.js"></script>
    )
}
