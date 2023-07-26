'use client'

export default function Error({ reset }) {
	return (
		<div>
			<h4>에러남 ㅅㄱ</h4>
			<button onClick={() => reset()}>Reset</button>
		</div>
	)
}
