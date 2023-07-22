import { connectDB } from '@/util/database'
import Link from 'next/link'
import EditLink from './EditLink'

export default async function List() {
	const db = (await connectDB).db('forum')
	let result = await db.collection('post').find().toArray()

	return (
		<div className="list-bg">
			{result.map((e) => {
				return (
					<div className="list-item" key={String(e._id)}>
						<Link href={`/detail/${e._id.toString()}`}>
							<h4>{e.title}</h4>
						</Link>
						<p>{e.content}</p>
						<EditLink postId={e._id.toString()} />
					</div>
				)
			})}
		</div>
	)
}
