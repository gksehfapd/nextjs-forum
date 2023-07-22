export default async function Write() {
	return (
		<div className="p-20">
			<form action="/api/signIn" method="POST">
				<input name="id" placeholder="ID" />
				<input name="pw" placeholder="PW" />
				<button type="submit">JOIN</button>
			</form>
		</div>
	)
}
