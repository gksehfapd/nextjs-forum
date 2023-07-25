import { connectDB } from '@/util/database'
import { ObjectId } from 'mongodb'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

export default async function handler(req: any, res: any) {
	//@ts-ignore
	let session = await getServerSession(req, res, authOptions)
	let db = (await connectDB).db('forum')
	let dbUser = await db.collection('user_cred').findOne({ email: session.user.email })

	if (session && session.user) {
		if (req.method === 'DELETE') {
			let result = await db.collection('post').findOne({ _id: new ObjectId(req.body) })

			if (result?.author === session.user.email || dbUser.role === 'admin') {
				await db.collection('post').deleteOne({ _id: new ObjectId(req.body) })
				return res.status(200).json('삭제완료')
			} else {
				return res.status(403).json('삭제권한 없음')
			}
		}
	}
}
