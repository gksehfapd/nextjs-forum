import { connectDB } from '@/util/database'
import { ObjectId } from 'mongodb'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

export default async function handler(req: any, res: any) {
	// @ts-ignore
	let session = await getServerSession(req, res, authOptions)
	let db = (await connectDB).db('forum')
	let dbUser = await db.collection('user_cred').findOne({ email: session.user.email })

	if (req.method === 'POST') {
		let result = await db.collection('post').findOne({ _id: new ObjectId(req.body._id) })
		if (session?.user?.email === result?.author || dbUser.role === 'admin') {
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
