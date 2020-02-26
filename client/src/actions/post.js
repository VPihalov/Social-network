import axios from 'axios'
import {
	GET_POSTS,
	GET_POST,
	POST_ERROR, 
	UPDATE_LIKES,
	DELETE_POST,
	SET_ALERT,
	CREATE_POST,
	CREATE_COMMENT,
	DELETE_COMMENT
} 
from './types'
import {setAlert} from './alert'

//Get posts
export const getPosts = () => async dispatch => {
	try {
		const res = await axios.get('/api/posts');
		dispatch({
			type: GET_POSTS,
			payload: res.data
		})
		
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		 });
	}
};

//Get post by id
export const getPost = id => async dispatch => {
	try {
		const res = await axios.get(`/api/posts/${id}`);
		dispatch({
			type: GET_POST,
			payload: res.data
		})
		
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		 });
	}
};

// Add like
export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {

		dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove like
export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
		});
		
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create post
export const createPost = text => async dispatch => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};
	
	try {
		const res = await axios.post('/api/posts', text, config);

		dispatch({
			type: CREATE_POST,
			payload: res.data
		})

		dispatch(setAlert("Post created successfully", "success"))

	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		})
	}
}

// Delete post
export const deletePost = id => async dispatch => {
	try {

		await axios.delete(`/api/posts/${id}`);
		dispatch({
			type: DELETE_POST,
			payload: {id}
		})

		dispatch(setAlert("Post deleted successfully", "success"))

	} catch(err) {
			console.log(err)
	}
};

// Create comment
export const createComment = (postId, comment) => async dispatch => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};
	
	try {
		const res = await axios.post(`/api/posts/comments/${postId}`, comment, config);

		dispatch({
			type: CREATE_COMMENT,
			payload: res.data
		})

		dispatch(setAlert("Comment created successfully", "success"))

	} catch (err) {
		console.log(`err`, err)
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		})
	}
}

// Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
	try {

		await axios.delete(`/api/posts/comments/${postId}/${commentId}`);
		dispatch({
			type: DELETE_COMMENT,
			payload: commentId
		})

		dispatch(setAlert("Comment deleted successfully", "success"))

	} catch(err) {
			console.log(err)
	}
};