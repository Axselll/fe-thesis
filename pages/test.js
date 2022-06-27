export default function test({ data, authorized, token }) {
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

