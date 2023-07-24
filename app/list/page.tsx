import { connectDB } from '@/util/database'
import ListItem from './ListItem'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export const dynamic = 'force-dynamic'

export const revalidate = 60

export default async function List() {
	const db = (await connectDB).db('forum')
	let result = await db.collection('post').find().toArray()
	//@ts-ignore
	let session = await getServerSession(authOptions)
	console.log(session)
	return (
		<div className="list-bg">
			<ListItem result={result} sessionEmail={session?.user?.email} />
		</div>
	)
}
