import { connectDB } from '@/util/database'

export default async function handler(req: any, res: any) {
	if (req.method === 'POST') {
		if (req.body.title == '') {
			return res.status(500).json('제목쓰셈')
		} else {
			const db = (await connectDB).db('forum')
			await db.collection('post').insertOne(req.body)

			res.redirect(302, '/list')
		}
	}
}
