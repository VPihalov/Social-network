import {
	GET_PROFILE,
	UPDATE_PROFILE,
	PROFILE_ERROR
} from '../actions/types';

const initialState = {
	profile: null,
	profiles: [],
	repos: [],
	loading: true,
	error: {}
};

export default function (state = initialState, action) {
	const {type, payload} = action;

	switch(type) {
		case GET_PROFILE:
		case UPDATE_PROFILE:
			return {
				...state,
				profile: payload,
				loading: false
			}
		case PROFILE_ERROR:
			return {
				...state,
				loading: false,
				error: payload,
				profile: null
			}
		default:
			return state
	}
}