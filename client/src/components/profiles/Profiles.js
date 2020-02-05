import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getProfiles} from '../../actions/profile'

const Profiles = ({getProfiles, profile}) => {

	const profiles = useEffect(() => {
		getProfiles()
	}, []);

	console.log('profiles', profiles)

	return (
		<div>
			Profiles
		</div>
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
