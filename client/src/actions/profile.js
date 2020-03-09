import axios from 'axios';
import {setAlert} from './alert';
import {
	GET_PROFILE,
	GET_PROFILES,
	GET_GITHUB_REPOS,
	UPDATE_PROFILE,
	PROFILE_ERROR,
	ACCOUNT_DELETED,
	CLEAR_PROFILE
} from './types';

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
	try {
	  const res = await axios.get('/api/profiles/me');
 
	  dispatch({
		 type: GET_PROFILE,
		 payload: res.data
	  });
	} catch (err) {
	  dispatch({
		 type: PROFILE_ERROR,
		 payload: { msg: err.response.statusText, status: err.response.status }
	  });
	}
 };

 // Get all profiles
export const getProfiles = () => async dispatch => {
	dispatch({type: CLEAR_PROFILE});
	try {
	  const res = await axios.get('/api/profiles');
		console.log('res', res)
	  dispatch({
		 type: GET_PROFILES,
		 payload: res.data
	  });
	} catch (err) {
	  dispatch({
		 type: PROFILE_ERROR,
		 payload: { msg: err.response.statusText, status: err.response.status }
	  });
	}
};

// Get profile by id
 export const getProfileById = (userId) => async dispatch => {
	try {
	  const res = await axios.get(`/api/profiles/user/${userId}`);
 
	  dispatch({
		 type: GET_PROFILE,
		 payload: res.data
	  });
	} catch (err) {
	  dispatch({
		 type: PROFILE_ERROR,
		 payload: { msg: err.response.statusText, status: err.response.status }
	  });
	}
};

// Get users github repos
 export const getGithubRepos = (userName) => async dispatch => {
	try {
	  const res = await axios.get(`/api/profiles/github/${userName}`);
 
	  dispatch({
		 type: GET_GITHUB_REPOS,
		 payload: res.data
	  });
	} catch (err) {
	  dispatch({
		 type: PROFILE_ERROR,
		 payload: { msg: err.response.statusText, status: err.response.status }
	  });
	}
};

// Create or update profile
export const createProfile = (
	formData,
	history,
	edit = false
 ) => async dispatch => {
	try {
	  const config = {
		 headers: {
			'Content-Type': 'application/json'
		 }
	  };
 
	  const res = await axios.post('/api/profiles', formData, config);
 
	  dispatch({
		 type: GET_PROFILE,
		 payload: res.data
	  });
 
	  dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
 
	  if (!edit) {
		 history.push('/dashboard');
	  }
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
		  errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}
  
		dispatch({
		  type: PROFILE_ERROR,
		  payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
 };

 //Add experience
 export const addExperience = (formData, history) => async dispatch => {
	try {
	  const config = {
		 headers: {
			'Content-Type': 'application/json'
		 }
	  };
 
	  const res = await axios.put('/api/profiles/experience', formData, config);
 
	  dispatch({
		 type: UPDATE_PROFILE,
		 payload: res.data
	  });
 
	  dispatch(setAlert('Experiece added', 'success'));
 
		history.push('/dashboard');

	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
		  errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}
  
		dispatch({
		  type: PROFILE_ERROR,
		  payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
 };

  //Add education
	export const addEducation = (formData, history) => async dispatch => {
		try {
			const config = {
			 headers: {
				'Content-Type': 'application/json'
			 }
			};
	 
			const res = await axios.put('/api/profiles/education', formData, config);
	 
			dispatch({
			 type: UPDATE_PROFILE,
			 payload: res.data
			});
	 
			dispatch(setAlert('Education added', 'success'));
	 
			history.push('/dashboard');
	
		} catch (err) {
			const errors = err.response.data.errors;
	
			if (errors) {
				errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
			}
		
			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			});
		}
	 };

	 //Delete experience
	 export const deleteExperience = id => async dispatch => {
		 try {
				 const res = await axios.delete(`/api/profiles/experience/${id}`)
				 dispatch({
					 type: UPDATE_PROFILE,
					 payload: res.data
				 });

				 dispatch(setAlert('Profile updated', 'success'));
	 
				//  history.push('/dashboard');
		 } catch(err) {
			const errors = err.response.data.errors;
	
			if (errors) {
				errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
			}
		
			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			});
		 }
	 }

	//Delete education
	export const deleteEducation = id => async dispatch => {
		try {
				const res = await axios.delete(`/api/profiles/education/${id}`)
				dispatch({
					type: UPDATE_PROFILE,
					payload: res.data
				});

				dispatch(setAlert('Profile updated', 'success'));
	
				//  history.push('/dashboard');
		} catch(err) {
			const errors = err.response.data.errors;
	
			if (errors) {
				errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
			}
		
			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			});
		}
	}

	//Delete account and profile
	export const deleteAccount = () => async dispatch => {
		try {
			if(window.confirm("Are sure? This operation will not be able undone")) {
				await axios.delete('/api/profiles');

				dispatch({type: ACCOUNT_DELETED});

				dispatch({type: CLEAR_PROFILE});
	
				dispatch(setAlert('Account deleted', 'success'));
			}
	
			//  history.push('/dashboard');
		} catch(err) {
			const errors = err.response.data.errors;
	
			if (errors) {
				errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
			}
		
			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			});
		}
	}