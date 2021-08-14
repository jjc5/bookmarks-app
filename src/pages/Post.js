import React, { useState, useEffect, useRef } from 'react';

export default function Show(props) {
	const [bookmark, setBookmark] = useState({});
	const titleInput = useRef(null); // doc.qs('input#title')
	const bodyInput = useRef(null); // doc.qs('input#body')

	const handleUpdate = async e => {
		e.preventDefault();
		try {
			const response = await fetch(`/api/bookmarks/${props.match.params.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title: titleInput.current.value,
					body: bodyInput.current.value
				})
			});
			const data = await response.json();
			setBookmark(data);
		} catch (error) {
			console.error(error);
		} finally {
			window.location.assign('/home');
		}
	};

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(`/api/bookmarks/${props.match.params.id}`);
				const data = await response.json();
				setBookmark(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);
	const handleDelete = async e => {
		try {
			const response = await fetch(`/api/bookmarks/${props.match.params.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const deletedBookmark = await response.json();
		} catch (error) {
			console.error(error);
		} finally {
			window.location.assign('/');
		}
	};
	return (
		<div className="ShowPage">
			{Object.keys(bookmark).length ? (
				<>
					<h3>{bookmark.title}</h3>
					<p>{bookmark.body}</p>
					<button onClick={handleDelete}>Delete</button>
				</>
			) : (
				<h1> Loading...</h1>
			)}
			<form
				style={{ display: 'flex', flexDirection: 'column' }}
				onSubmit={handleUpdate}
			>
				<label>
					{' '}
					Title:{' '}
					<input type="text" ref={titleInput} defaultValue={bookmark.title} />
				</label>
				<label>
					{' '}
					Body:{' '}
					<input type="text" ref={bodyInput} defaultValue={bookmark.body} />
				</label>
				<input type="submit" value="Update MicroBookmark" />
			</form>
		</div>
	);
}
