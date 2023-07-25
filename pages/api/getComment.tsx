import { connectDB } from '@/util/database'

export default async function handler(req: any, res: any) {
	if (req.method === 'GET') {
		let db = (await connectDB).db('forum')
		let result = await db.collection('comment').find({ parent: req.query.postId }).toArray()

		res.status(200).json(result)
	}
}
