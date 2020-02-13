import React, {useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getProfileById} from '../../actions/profile'
import Spinner from '../../components/layout/Spinner'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'

const Profile = ({
	getProfileById,
	profile: {profile, loading},
	auth,
	match
}) => {

	const gottenProfile = useEffect(() => {
		getProfileById(match.params.id)
	}, [getProfileById]);

	console.log('gottenProfile', gottenProfile)

	return (
		<Fragment>
			{loading || profile === null ? <Spinner/> : (<Fragment>
				<Link to="/profiles" className="btn btn-light">
					Back to profiles	
				</Link>
				{auth.loading === false &&
				 auth.isAuthenticated &&
				 auth.user._id === profile.user._id &&
				 (<Link to="/edit-profile" className="btn btn-dark">
					 Edit Profile
					</Link>)}
				<ProfileTop profile={profile}></ProfileTop>	
				<ProfileAbout profile={profile}></ProfileAbout>	
			</Fragment>)}
		</Fragment>
	)
}

Profile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth
})

export default connect(mapStateToProps, {getProfileById}) (Profile)
