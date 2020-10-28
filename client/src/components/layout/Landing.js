import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({isAuthenticated}) => {
  if(isAuthenticated) {
    return <Redirect to='/dashboard'/>
	}

	let fibNums = [0, 1];
	function getFibNums(n) {
		if (n > 2) {
			let nextNumber = fibNums[fibNums.length - 2] + fibNums[fibNums.length - 1];
			fibNums.push(nextNumber);
			getFibNums(n -1)

		} else {
			return fibNums
		}
		return fibNums
	}

	console.log(getFibNums(10 ))

	return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Social Network for developers</h1>
          <p className="lead">
						Create your portfolio and share knowledges with other developers
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
							Sign Up
						</Link>
            <Link to="/login" className="btn btn-light">
							Login
						</Link>
          </div>
        </div>
      </div>
    </section>
	)
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

Landing.prototype = {
  isAuthenticated: PropTypes.bool
};

export default connect(mapStateToProps) (Landing)