import axios from 'axios';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED, 
	AUTH_ERROR,
	LOGIN_SUCCESS,
  LOGIN_FAIL,
	LOGOUT,
	CLEAR_PROFILE
} 
from './types';
import {setAlert} from '../actions/alert';
import setAuthToken from '../utils/setAuthToken';

//Register user
export const register = ({name, email, password}) => async dispatch => {
	const body = JSON.stringify({name, email, password});
	const config = {
		 headers: {
				'Content-Type': 'application/json'
		 }
	};
	try {
		 const res = await axios.post('/api/users', body, config);
		 dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data
		 });
		 dispatch(loadUser())
	} catch (error) {
		 const errors = error.response.data.errors;
		 if (errors) {
				errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		 }
		 dispatch({
				type: REGISTER_FAIL
		 })
	}
}

//Load user
export const loadUser = () => async dispatch => {
	if (localStorage.token) {
		setAuthToken(localStorage.token)
	}
	try {
		const res = await axios.get('/api/auth');
		dispatch({
			type: USER_LOADED,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: AUTH_ERROR
		})
	}

}

//Login user
export const login = (email, password) => async dispatch => {
	const body = JSON.stringify({email, password});
	const config = {
		 headers: {
				'Content-Type': 'application/json'
		 }
	};
	try {
		 const res = await axios.post('/api/auth', body, config);
		 dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data
		 })
		 dispatch(loadUser())
	} catch (error) {
		 const errors = error.response.data.errors;
		 if (errors) {
				errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		 }
		 dispatch({
				type: LOGIN_FAIL
		 })
	}
}

//Logout user / Clear profile
export const logout = () => dispatch => {
   dispatch({type: CLEAR_PROFILE});
   dispatch({type: LOGOUT})
}