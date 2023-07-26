'use client'

import { useState } from 'react'

export default function Like({ postId }) {
	// const [like, setLike] = useState(false)

	const onLikeClick = () => {
		fetch(`/api/like?postId=${postId}`, {
			method: 'POST'
		})
		// setLike((prev) => !prev)
	}
	const onLikeClear = () => {
		// setLike((prev) => !prev)
	}
	return (
		<div>
			<h4>좋아여</h4>
			{/* {like ? (
				<button onClick={onLikeClick}>누름</button>
			) : (
				<button onClick={onLikeClick}>안누름</button>
			)} */}
			<button onClick={onLikeClick}>누름</button>
			<button onClick={onLikeClear}>안누름</button>
		</div>
	)
}
