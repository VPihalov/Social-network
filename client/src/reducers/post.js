import {
	GET_POSTS, 
	GET_POST, 
	POST_ERROR, 
	UPDATE_LIKES,
	DELETE_POST,
	CREATE_POST,
	GET_PROFILE,
	CREATE_COMMENT,
	DELETE_COMMENT
} 
from '../actions/types'

const initialState = {
	posts: [],
	loading: true,
	post: null,
	error: {}
};

export default function(state = initialState, action) {
	const {type, payload} = action;

	switch(type) {
		case GET_POSTS:
			return {
				...state,
				posts: payload,
				loading: false
			}
		case GET_POST:
			return {
				...state,
				post: payload,
				loading: false
			}
		case POST_ERROR:
			return {
				...state,
				error: payload,
				loading: false
			}
		case UPDATE_LIKES:
			return {
				...state,
				posts: state.posts.map(post =>
					post._id === payload.id ? { ...post, likes: payload.likes } : post
				),
				loading: false
			};
		case DELETE_POST:
			return {
				...state,
				loading: false,
				posts: state.posts.filter(post => post._id !== payload.id)
			};
		case CREATE_POST:
			return {
				...state,
				loading: false,
				posts: [payload, ...state.posts]
			}
		case CREATE_COMMENT:
			return {
				...state,
				loading: false,
				post: payload  
			}
		case DELETE_COMMENT:
			return {
				...state,
				loading: false,
				post: {
					...state.post, comments: state.post.comments.filter(comment => comment._id !== payload)
				}
			}	
		default: 
			return state
	}
}