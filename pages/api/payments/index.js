import connect from 'database/connect'
import Payments from 'database/schemas/payments'
import Soa from 'database/schemas/soa'

export default async (req, res) => {
	const { method } = req
	await connect()

	switch (method) {
		case 'GET':
			try {
				const data = await Payments.find({}).sort({ createdAt: -1 })
				res.status(200).send(data)
			} catch (error) {
				return res.status(400).send('request failed.')
			}

			break

		case 'POST':
			try {
				const { data } = req.body

				await Payments.create({
					...data,
					created: new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' }),
					updated: new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })
				})

				await Soa.findByIdAndUpdate(
					{ _id: data.soa.id },
					{
						status: true,
						updated: new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })
					}
				)

				res.status(200).send('request success.')
			} catch (error) {
				return res.status(400).send('request failed.')
			}

			break

		case 'PATCH':
			try {
				const { id, data } = req.body

				if (data.type === 'accept') {
					await Payments.findByIdAndUpdate(
						{ _id: id },
						{
							status: 'accepted',
							updated: new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })
						}
					)
				} else {
					await Payments.findByIdAndUpdate(
						{ _id: id },
						{
							status: 'rejected',
							updated: new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })
						}
					)

					await Soa.findByIdAndUpdate(
						{ _id: data.soa },
						{
							status: false,
							updated: new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })
						}
					)
				}

				res.status(200).send('request success.')
			} catch (error) {
				return res.status(400).send('request failed.')
			}

			break

		case 'DELETE':
			try {
				res.status(200).send('request success.')
			} catch (error) {
				return res.status(400).send('request failed.')
			}

			break

		default:
			res.status(400).send('request failed.')
			break
	}
}
