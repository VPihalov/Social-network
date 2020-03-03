import React, {Fragment, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {login} from '../../actions/auth';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const Login = ({login, isAuthenticated}) => {
	//formData - our state - all widgets on the form
	//formDate is like state = {formData: {}}
	//setFormData - function to update state
	//setFormData - is like this.setState - pass new state
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const {email, password} = formData;
	const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
	const onSubmit = async e => {
		e.preventDefault();
		login(email, password)
	}

	if(isAuthenticated) {
		return (
			<Redirect to='/dashboard'/>
		)
	}
	
	return (
		<Fragment>
			<h1 className="large text-primary">Sign in</h1>
				<p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
				<form className="form" onSubmit={e => onSubmit(e)}>
					<div className="form-group">
						<input
							type="email" 
							placeholder="Email Address" 
							name="email"
							value={email} 
							onChange={e => onChange(e)} 
							required
						/>
					</div>
					<div className="form-group">
						<input
							type="password"
							placeholder="Password"
							name="password"
							value={password} 
							onChange={e => onChange(e)} 
							required
							minLength="6"
						/>
					</div>
					<div className="form-group">
					</div>
					<input type="submit" className="btn btn-primary" value="Login" />
				</form>
				<p className="my-1">
					Don't have an account yet? <Link to="/register">Register</Link>
				</p>
		</Fragment>
	)
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	mapStateToProps: PropTypes.bool,
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login)
