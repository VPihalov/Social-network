import React, {useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getProfileById} from '../../actions/profile'
import Spinner from '../../components/layout/Spinner'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithubRepos from './ProfileGithubRepos'

const Profile = ({
	getProfileById,
	profile: {profile, loading},
	auth,
	match
}) => {

	const gottenProfile = useEffect(() => {
		getProfileById(match.params.id)
	}, [getProfileById, match.params.id]);

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
				<div className="profile-grid my-1">
					<ProfileTop profile={profile}></ProfileTop>	
					<ProfileAbout profile={profile}></ProfileAbout>
					<div className='profile-exp bg-white p-2'>
						<h2 className='text-primary'>Experience</h2>
						{profile.experience.length > 0 ? (
							profile.experience.map(exp => {
								return <ProfileExperience key={exp._id} experience={exp}/>
							})
						) : (<h4>No experience credentials</h4>)}
					</div>	
					<div className='profile-edu bg-white p-2'>
						<h2 className='text-primary'>Education</h2>
						{profile.education.length > 0 ? (
							profile.education.map(edu => {
								return <ProfileEducation key={edu._id} education={edu}/>
							})
						) : (<h4>No education credentials</h4>)}
					</div>	
					{profile.githubusername && <ProfileGithubRepos userName={profile.githubusername}/>}
				</div>
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
