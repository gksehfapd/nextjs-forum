import { connectDB } from '@/util/database'

export default async function handler(req: any, res: any) {
	if (req.method === 'POST') {
		if (req.body.title == '') {
			return res.status(500).json('제목쓰셈')
		}
		try {
			const db = (await connectDB).db('forum')
			await db.collection('post').insertOne(req.body)
			return res.status(200).redirect('/list')
		} catch (error) {
			alert('오류!')
		}
	}
}
