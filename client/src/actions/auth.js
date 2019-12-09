import axios from 'axios';
import {REGISTER_SUCCESS, REGISTER_FAIL} from './types';
import {setAlert} from '../actions/alert';

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
      })
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