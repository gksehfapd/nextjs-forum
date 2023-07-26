import { connectDB } from '@/util/database'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

export default async function handler(req: any, res: any) {
	if (req.method === 'POST') {
		let queryPostId = req.query.postId
		const db = (await connectDB).db('forum')
		//@ts-ignore
		let session = await getServerSession(req, res, authOptions)
		let userEmail = session.user.email

		//user의 Email로 user가 likes에 있는지 확인
		let isUserLiked = await db.collection('likes').findOne({ userEmail })

		if (isUserLiked) {
			if (isUserLiked.postId.includes(queryPostId)) {
				//좋아요를 이미 눌렀을 경우 좋아요 취소
				await db.collection('likes').findOneAndUpdate(
					{ userEmail },
					{
						$set: {
							postId: isUserLiked.postId.filter((e: any) => e !== queryPostId)
						}
					}
				)
				res.status(200)
			} else {
				//좋아요를 누르지 않았을 경우
				await db
					.collection('likes')
					.findOneAndUpdate(
						{ userEmail },
						{ $set: { postId: [...isUserLiked.postId, queryPostId] } }
					)
				res.status(200)
			}
		} else {
			//가입 후 처음으로 좋아요를 눌렀을 경우
			let body = { userEmail, postId: [queryPostId] }
			await db.collection('likes').insertOne(body)
			res.status(200)
		}
	}
}
