export default async function handler(req: any, res: any) {
	if (req.method === 'GET') {
		let currentTime = new Date()
		return res.status(200).json(currentTime)
	}
}
