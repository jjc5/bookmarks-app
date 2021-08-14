import React, { useState, useEffect } from 'react';
import Create from '../components/Create.js';
import { Link } from 'react-router-dom';

export default function Home(props) {
	const [bookmarks, setBookmarks] = useState([]); // <==== Bookmarks State

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/api/bookmarks');
				const data = await response.json();
				setBookmarks(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	const handleDelete = async bookmarkId => {
		try {
			const response = await fetch(`/api/bookmarks/${bookmarkId}`, {
				method: 'DELETE',
				header: {
					'Content-Type': 'application/json'
				}
			});
			const deletedBookmark = await response.json();
		} catch (error) {
			console.error(error);
		} finally {
			window.location.assign('/home');
		}
	};

	return (
		<div className="HomePage container text-center">
			<h1>Bookmarks</h1>
			<Create bookmarks={bookmarks} setBookmarks={setBookmarks} />
			<div className="">
				<ul className="">
					{bookmarks.map(bookmark => {
						return (
							<li key={bookmark._id} className="flx-md-row">
								<a
									href={`/`}
									onClick={() => window.open(bookmark.body, '_blank')}
								>
									<h3 class="titles">{bookmark.title}</h3>
								</a>
								<Link to={`/${bookmark._id}`}>
									<button className="editBtn">Edit Bookmark</button>
								</Link>
								<button
									className="deleteBtn"
									onClick={() => {
										handleDelete(bookmark._id);
									}}
								>
									<img
										id="trashcan"
										src="https://cdn.iconscout.com/icon/premium/png-512-thumb/trash-can-1778449-1515973.png"
									></img>
								</button>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
