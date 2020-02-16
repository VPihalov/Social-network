import React, {useEffect} from 'react'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'
import {getPosts} from '../../actions/post'
import {connect} from 'react-redux'

const Posts = ({
	getPosts,
	post: {loading, post}
}) => {
	useEffect(() => {
		getPosts()
	}, [getPosts])

	return (
		<div>
			
		</div>
	)
}

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	post: state.post
})

export default connect(mapStateToProps, {getPosts}) (Posts)
