import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import EditModal from './EditModal';
import PostButtons from './PostButtons';

const Post = ({ postId, userId, username, title, body }) => {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	function Edit() {
		handleShow();
	}
	function Delete() {
		axios({
			method: 'DELETE',
			url: `http://localhost:8000/posts/${postId}`,
		});
		window.location.reload(false);
	}

	return (
		<div>
			<Card border='warning'>
				<Card.Header>{username}</Card.Header>
				<Card.Body>
					<Card.Title>{title}</Card.Title>
					<Card.Text>{body}</Card.Text>
				</Card.Body>
				<Card.Footer>
					{userId == localStorage.getItem('id') ? (
						<div>
							<button className='btn btn-warning' onClick={Edit}>
								Edit
							</button>
							<button className='btn btn-warning' onClick={Delete}>
								Delete
							</button>
						</div>
					) : (
						<p></p>
					)}
				</Card.Footer>
			</Card>
			<EditModal
				show={show}
				handleClose={handleClose}
				postId={postId}
				title={title}
				body={body}
			/>
		</div>
	);
};

export default Post;
