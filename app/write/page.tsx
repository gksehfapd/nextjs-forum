import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'

export default async function Write() {
	//@ts-ignore
	let session = await getServerSession(authOptions)
	if (session) {
		return (
			<div className="p-20">
				<form action="/api/newPost" method="POST">
					<input name="title" placeholder="글제목" />
					<input name="content" placeholder="글내용" />
					<button type="submit">전송</button>
				</form>
			</div>
		)
	} else {
		return <div>로그인하셈</div>
	}
}
