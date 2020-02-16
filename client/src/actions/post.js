import axios from 'axios'
import {GET_POSTS, POST_ERROR} from './types'
import {setAlert} from './alert'

//get posts
export const getPosts = () => async dispatch => {
	try {
		const res = await axios.get('/api/posts');
		dispatch({
			type: GET_POSTS,
			payload: res
		})
		
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		 });
	}

}