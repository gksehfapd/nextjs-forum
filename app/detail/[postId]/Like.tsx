'use client'

import { useEffect, useState } from 'react'

export default function Like({ postId, likeList }) {
	const [like, setLike] = useState(false)

	useEffect(() => {
		if (likeList.includes(postId)) {
			setLike(true)
		} else if (!likeList.includes(postId)) {
			setLike(false)
		}
	}, [])
	const onLikeClick = () => {
		fetch(`/api/like?postId=${postId}`, {
			method: 'POST'
		})
		setLike((prev) => !prev)
	}
	return (
		<div>
			{like ? (
				<button onClick={onLikeClick} style={{ backgroundColor: 'skyblue' }}>
					좋아요
				</button>
			) : (
				<button onClick={onLikeClick}>좋아요</button>
			)}
		</div>
	)
}
