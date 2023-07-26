'use client'

import { useState } from 'react'

export default function Like({ postId }) {
	// const [like, setLike] = useState(false)

	const onLikeClick = () => {
		fetch(`/api/like?postId=${postId}`, {
			method: 'POST'
		})
	}
	return (
		<div>
			<h4>좋아여</h4>

			<button onClick={onLikeClick}>누름</button>
		</div>
	)
}
