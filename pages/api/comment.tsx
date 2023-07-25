import { connectDB } from '@/util/database'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

export default async function handler(req: any, res: any) {
	if (req.method === 'POST') {
		// @ts-ignore
		let session = await getServerSession(req, res, authOptions)

		if (session && session.user) {
			let db = (await connectDB).db('forum')
			const parseData = JSON.parse(req.body)

			await db.collection('comment').insertOne({
				content: parseData.comment,
				author: session.user.email,
				parent: parseData.postId,
				name: session.user.name
			})
			res.status(200).json('댓글 완료')
		} else {
			res.status(403).json('로그인 하세요')
		}
	}
}
