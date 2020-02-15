import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileExperience = ({
	experience: {
		company, 
		title, 
		location,
		to, 
		from, 
		current, 
		description
	}
}) => <div>
	<h3 className="text-dark">{company}</h3>
	<p>
		<Moment format='YYYY/MM/DD'>{from}</Moment> - {!to ? 'Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
	</p>
	<p>
		<strong>Position</strong> {title ? title : 'No data'}
	</p>
	<p>
		<strong>Description</strong> {description ? description : "No description"}
	</p>
</div>

ProfileExperience.propTypes = {
	experience: PropTypes.object.isRequired,
}

export default ProfileExperience
