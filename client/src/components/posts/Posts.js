import React, {useEffect, Fragment} from 'react'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'
import PropTypes from 'prop-types'
import {getPosts} from '../../actions/post'
import {connect} from 'react-redux'
import { loadUser } from '../../actions/auth'

const Posts = ({
	getPosts,
	post: {loading, posts}
}) => {

	useEffect(() => {
		getPosts()
	}, [getPosts])

	return loading ? (<Spinner/>) : (<Fragment>
		<h1 className="large text-primary">Posts</h1>
		<p className="lead">
			<i className="fas fas-user"></i> Welcome to the community
		</p>
		{/*Post form*/}
		<div className='posts'>
        {posts.data.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
     </div>
	</Fragment>)
}

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	post: state.post
})

export default connect(mapStateToProps, {getPosts}) (Posts)
