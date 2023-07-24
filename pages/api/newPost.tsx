import { connectDB } from '@/util/database'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

export default async function handler(req: any, res: any) {
	let session = await getServerSession(req, res, authOptions)

	if (session && session.user) {
		req.body.author = session.user.email
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
}
