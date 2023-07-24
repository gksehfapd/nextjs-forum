import { connectDB } from '@/util/database'
import { ObjectId } from 'mongodb'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

export default async function handler(req: any, res: any) {
	let session = await getServerSession(req, res, authOptions)

	if (req.method === 'POST') {
		let db = (await connectDB).db('forum')

		let result = await db.collection('post').findOne({ _id: new ObjectId(req.body._id) })
		if (session?.user?.email === result?.author) {
			await db
				.collection('post')
				.updateOne(
					{ _id: new ObjectId(req.body._id) },
					{ $set: { title: req.body.title, content: req.body.content } }
				)

			return res.redirect(302, '/list')
		} else {
			return res.status(403).json('업데이트 권한 없음')
		}
	}
}
