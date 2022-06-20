export default function test({ data, authorized, token }) {
	console.log(data.app.authUser);
	console.log(token);
	return (
		<div>
			{authorized ? (
				<div>Page Content</div>
			) : (
				<div>Log In to view this content</div>
			)}
		</div>
	);
}

