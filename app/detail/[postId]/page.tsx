import { connectDB } from '@/util/database'
import { ObjectId } from 'mongodb'
import Comment from './Comment'
import Like from './Like'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export default async function Detail(props: any) {
	//@ts-ignore
	let session = await getServerSession(authOptions)
	const db = (await connectDB).db('forum')
	const postId = props.params.postId
	let result = await db.collection('post').findOne({ _id: new ObjectId(`${postId}`) })
	let likeList = await db.collection('likes').findOne({ userEmail: session.user.email })

	return (
		<div>
			<h4>상세페이지</h4>
			<Like postId={postId} likeList={likeList.postId} />

			<h4>{result?.title}</h4>
			<p>{result?.content}</p>
			<Comment postId={postId} />
		</div>
	)
}
