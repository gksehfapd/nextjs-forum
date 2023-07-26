import { connectDB } from '@/util/database'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

export default async function handler(req: any, res: any) {
	if (req.method === 'POST') {
		let queryPostId = req.query.postId
		const db = (await connectDB).db('forum')
		//@ts-ignore
		let session = await getServerSession(req, res, authOptions)

		//세션으로 user의 ObjectID를 Mongo에서 가져옴
		let userExist = await db.collection('user_cred').findOne({ email: session.user.email })
		let userId = userExist._id

		//user의 ObjectId로 user가 likes에 있는지 확인
		let isUserLiked = await db.collection('likes').findOne({ userId })

		if (isUserLiked) {
			if (isUserLiked.postId.includes(queryPostId)) {
				//TODO:좋아요를 이미 눌렀을 경우 좋아요 취소기능
				return console.log('이미 좋아요')
			} else {
				//좋아요를 누르지 않았을 경우
				await db
					.collection('likes')
					.findOneAndUpdate(
						{ userId },
						{ $set: { postId: [...isUserLiked.postId, queryPostId] } }
					)
				return res.status(200)
			}
		} else {
			//가입 후 처음으로 좋아요를 눌렀을 경우
			let body = { userId, postId: [queryPostId] }
			await db.collection('likes').insertOne(body)
			return res.status(200)
		}
		// return res.status(200).json(result)
	}
}
