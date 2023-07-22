'use client'

import { useRouter } from 'next/navigation'

export default function Edit(props: any) {
	const router = useRouter()

	return (
		<button
			onClick={() => {
				router.push(`/edit/${props.postId}`)
			}}
		>
			버튼
		</button>
	)
}
