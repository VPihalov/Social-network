import React, {useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getProfiles} from '../../actions/profile'
import Spinner from '../layout/Spinner'
import ProfileItem from './ProfileItem'

const Profiles = ({getProfiles, profile: {loading, profiles}}) => {

	useEffect(() => {
		getProfiles()
	}, [getProfiles]);


	return (
		<Fragment>
			{loading ? <Spinner/> : (
				<Fragment>
					<h1 className="large text-primary">Developers profiles</h1>
					<p className="lead">
						<i className="fab fa-connectdevelop">
							Browse and connect with developers
						</i>
					</p>
					<div className="profiles">
						{profiles.length > 0 ? (
							profiles.map(profile => {
								return <ProfileItem key={profile._id} profile={profile}></ProfileItem>							
							})
						) : (<h4> No profiles found </h4>)}
					</div>
				</Fragment>
			)}
		</Fragment>
	)
}

Profiles.propTypes = {
	profile: PropTypes.object.isRequired,
	getProfiles: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	profile: state.profile,
})

export default connect(mapStateToProps, {getProfiles}) (Profiles)
