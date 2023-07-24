'use client'

import Link from 'next/link'
import EditLink from './EditLink'

export default function ListItem({ result, sessionEmail }: any) {
	return (
		<div>
			{result.map((e: any) => {
				return (
					<div className="list-item" key={String(e._id)}>
						<Link href={`/detail/${e._id.toString()}`}>
							<h4>{e.title}</h4>
						</Link>
						<p>{e.content}</p>
						<p>{e.author}</p>
						{sessionEmail === e.author ? <EditLink postId={e._id.toString()} /> : null}
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
