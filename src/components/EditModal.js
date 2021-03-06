import React, { useState } from 'react';
import BootstrapModal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { apiUrl } from '../config';

const EditModal = ({ show, handleClose, postId, title, body, setRefresh }) => {
	const [editPost, setEditPost] = useState({});

	function handleChange(event) {
		event.preventDefault();
		setEditPost({ ...editPost, [event.target.id]: event.target.value });
	}
	function editYourPost(event) {
		event.preventDefault();
		axios({
			method: 'PATCH',
			url: `${apiUrl}/posts/${postId}`,
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			data: editPost,
		}).then(() => {
			handleClose();
			setRefresh(true);
		});
	}

	return (
		<BootstrapModal show={show} onHide={handleClose}>
			<BootstrapModal.Header closeButton>
				<BootstrapModal.Title>Edit Post</BootstrapModal.Title>
			</BootstrapModal.Header>
			<BootstrapModal.Body>
				<form id='edit'>
					Title:{' '}
					<textarea form='edit' rows='1' id='title' onChange={handleChange}>
						{title}
					</textarea>
					<textarea id='body' form='edit' cols='50' onChange={handleChange}>
						{body}
					</textarea>
					<Button variant='primary' onClick={editYourPost} type='submit'>
						Submit
					</Button>
				</form>
			</BootstrapModal.Body>
		</BootstrapModal>
	);
};

export default EditModal;
