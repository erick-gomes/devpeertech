import Central from '../../../models/Central'
import os from 'os-utils'

const { Guest, Estatistica } = Central

export default async function handler (req, res) {
    if (req.method === 'GET') {
        switch (req.query.chart) {
        case '1': {
            try {
                const result = await Estatistica.findOne({
                    attributes: ['total_links', 'total_media']
                })
                res.status(200).json({
                    links: result.dataValues.total_links,
                    media: result.dataValues.total_media
                })
            } catch (error) {
                res.status(500).json({ status: 500, message: 'Internal Server Error' })
            }
            break
        }
        case '2': {
            try {
                const result = await Estatistica.findOne({
                    attributes: ['total_trv', 'total_flood']
                })
                res.status(200).json({
                    trava: result.dataValues.total_trv,
                    flood: result.dataValues.total_flood
                })
            } catch (error) {
                res.status(500).json({ status: 500, message: 'Internal Server Error' })
            }
            break
        }
        case '3': {
            try {
                function apiResolve () {
                    function timeResponse (t1, t2) {
                        const s = t2[0] - t1[0]
                        const mms = t2[1] - t1[1]
                        return s * 1e9 + mms
                    }
                    return new Promise((resolve, reject) => {
                        os.cpuUsage(p => {
                            const cpuPercentage = Math.round(p * 100)
                            const MaxMem = Math.round(os.totalmem())
                            const MemUsage = Math.round(os.totalmem() - os.freemem())
                            const memoryPercentage = Math.round((MemUsage / MaxMem) * 100)
                            const t1 = process.hrtime()
                            const t2 = process.hrtime()

                            res.status(200).json({
                                memory: memoryPercentage,
                                cpu: cpuPercentage,
                                network: timeResponse(t1, t2)
                            })
                            resolve()
                        })
                    })
                }
                await apiResolve()
            } catch (error) {
                res.status(500).json({ status: 500, message: 'Internal Server Error' })
            }
            break
        }
        case '4': {
            try {
                const result = await Guest.findAll({
                    attributes: ['username', 'total_user_msg']
                })
                res.status(200).json(result)
            } catch (error) {
                res.status(500).json({ status: 500, message: 'Internal Server Error' })
            }
            break
        }
        default:
            res.status(404).json({ status: 404, message: 'Not Found' })
            break
        }
    } else { res.status(404).json({ status: 404, message: 'Not Found' }) }
}
