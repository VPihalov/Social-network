import {GET_POSTS, POST_ERROR, UPDATE_LIKES} from '../actions/types'

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
		case POST_ERROR:
			return {
				...state,
				error: payload,
				loading: false
			}
			case UPDATE_LIKES:
				console.log(`state`, state.posts.data)
				return {
					...state,
					posts: state.posts.data.map(post =>
						post._id === payload.id ? { ...post, likes: payload.likes } : post
					),
					loading: false
				};
		default: 
			return state
	}
}