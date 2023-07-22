import { connectDB } from '@/util/database'

export default async function handler(req: any, res: any) {
	if (req.method === 'POST') {
		if (req.body.id == '') {
			return res.status(500).json('아이디쓰셈')
		} else if (req.body.pw == '') {
			return res.status(500).json('비번쓰셈')
		}
		try {
			const db = (await connectDB).db('user')
			await db.collection('userInfo').insertOne(req.body)
			return res.status(200).redirect('/list')
		} catch (error) {
			alert('오류!')
		}
	}
}
