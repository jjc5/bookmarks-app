import React, { useState, useEffect } from 'react';

function Create(props) {
	const [bookmarks, setBookmarks] = useState([]);
	const [newBookmark, setNewBookmark] = useState({
		title: '',
		body: ''
	});

	const handleSubmit = async e => {
		try {
			const response = await fetch('/api/bookmarks', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newBookmark)
			});
			const data = await response.json();
			setBookmarks([...bookmarks, data]);
			setNewBookmark({
				title: '',
				body: ''
			});
		} catch (error) {
			console.error(error);
		}
	};
	const handleChange = e => {
		setNewBookmark({ ...newBookmark, [e.target.id]: e.target.value });
	};

	return (
		<div className="NewBookmark">
			<p></p>
			<div id="">
				<form onSubmit={handleSubmit} className="">
					<input
						className="form-control"
						type="text"
						id="title"
						placeholder="Website name"
						value={newBookmark.title}
						onChange={handleChange}
					/>{' '}
					<input
						className="form-control"
						type="text"
						id="body"
						placeholder="Link (including https://)"
						value={newBookmark.body}
						onChange={handleChange}
					/>{' '}
					<button className="btn btn-primary" type="submit" value="Add">
						Add Bookmark
					</button>
				</form>
			</div>
		</div>
	);
}

export default Create;
