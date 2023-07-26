import { connectDB } from '@/util/database'
import { ObjectId } from 'mongodb'
import Comment from './Comment'
import Like from './Like'

export default async function Detail(props: any) {
	const db = (await connectDB).db('forum')
	const postId = props.params.postId
	let result = await db.collection('post').findOne({ _id: new ObjectId(`${postId}`) })

	return (
		<div>
			<h4>상세페이지</h4>
			<Like postId={postId} />

			<h4>{result?.title}</h4>
			<p>{result?.content}</p>
			<Comment postId={postId} />
		</div>
	)
}
