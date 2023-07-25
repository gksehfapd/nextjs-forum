'use client'

import { useEffect, useState } from 'react'

export default function Comment({ postId }) {
	let [comment, setComment] = useState('')
	let [commentList, getCommentList] = useState([])
	let [commentState, setCommentState] = useState(false)

	useEffect(() => {
		fetch(`/api/getComment?postId=${postId}`, {
			method: 'GET'
		})
			.then((res) => res.json())
			.then((res) => {
				getCommentList(res)
				setCommentState(false)
			})
	}, [commentState])

	return (
		<div>
			<div>
				{commentList.length > 0
					? commentList.map((e) => {
							return (
								<div key={e._id}>
									<span>{e.name}</span>
									<br />
									<span>{e.content}</span>
									<hr />
								</div>
							)
					  })
					: '댓글없음'}
			</div>

			<input
				type="text"
				className="commentInput"
				onChange={(e) => {
					setComment(e.target.value)
				}}
			/>

			<button
				onClick={() => {
					fetch('/api/comment', {
						method: 'POST',
						body: JSON.stringify({ comment, postId })
					}).then((res) => {
						if (res.status == 200) {
							setCommentState(true)
							//@ts-ignore
							document.querySelector('.commentInput').value = ''
						}
					})
				}}
			>
				댓글
			</button>
		</div>
	)
}
