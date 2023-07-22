'use client'

import { useRouter } from 'next/navigation'

export default function Edit(props: any) {
	const router = useRouter()

	return (
		<span
			onClick={() => {
				router.push(`/edit/${props.postId}`)
			}}
		>
			📝
		</span>
	)
}
