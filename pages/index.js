import React from 'react'
import verifyServerSession from '../components/session/Session'
import Chart from '../components/chart/Chart'
import styles from '../styles/styles.module.css'
import Nav from '../components/navigation/Nav'
import Snip from '../components/sniply/Snip'

export default function Login ({ session }) {
    return (
        <>
            <Nav />
            <div className="container-fluid">
                <div className="row">
                    <div className={styles.verticalCenter + ' col-md-6'}>
                        <div id={styles.chart_div}></div>
                        <div id={styles.pre1} className={styles.pre}></div>
                    </div>
                    <div className={styles.verticalCenter + ' col-md-6'}>
                        <div id={styles.chart_div2}></div>
                        <div id={styles.pre2} className={styles.pre}></div>
                    </div>
                </div>
                <hr />
                <div style={{ height: '200px' }} className={styles.role2 + ' row'}>
                    <div className={styles.verticalCenterG + ' col-md-11'}>
                        <h6 id={styles.infoSys}></h6>
                        <div className="mt-3 ml-5" id={styles.chart_div3}></div>
                        <div id={styles.pre3} className={styles.pre}></div>
                    </div>
                </div>
                <hr id={styles.spaceHr}/>
                <div className="row mb-5">
                    <div className="col-md-11">
                        <div className="mt-2" id={styles.chart_div4}></div>
                        <div id={styles.pre4} className={styles.pre}></div>
                    </div>
                </div>
            </div>
            <Chart />
            <Snip />
        </>
    )
}

export async function getServerSideProps (context) {
    const r = await verifyServerSession(context)
    if (r.redirect) {
        return { redirect: r.redirect }
    }
    return {
        props: { session: r.session }
    }
}
