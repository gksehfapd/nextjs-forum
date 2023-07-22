'use client'

import Link from 'next/link'
import EditLink from './EditLink'

export default function ListItem({ result }: any) {
	return (
		<div>
			{result.map((e: any) => {
				return (
					<div className="list-item" key={String(e._id)}>
						<Link href={`/detail/${e._id.toString()}`}>
							<h4>{e.title}</h4>
						</Link>
						<p>{e.content}</p>
						<EditLink postId={e._id.toString()} />
						<span
							onClick={(event: any) => {
								fetch('/api/delete', {
									method: 'DELETE',
									body: e._id
								}).then(() => {
									event.target.parentElement.style.opacity = 0
									setTimeout(() => {
										event.target.parentElement.style.display = 'none'
									}, 1000)
								})
							}}
						>
							🗑️
						</span>
					</div>
				)
			})}
		</div>
	)
}
