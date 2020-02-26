import React, {useEffect, Fragment} from 'react'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'
import PostForm from './PostForm'
import PropTypes from 'prop-types'
import {getPosts} from '../../actions/post'
import {connect} from 'react-redux'

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
		<PostForm/>
		<div className='posts'>
        {posts.map((post, index) => (
          <PostItem key={index} post={post} />
        ))}
     </div>
	</Fragment>)
};

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	post: state.post
});

export default connect(mapStateToProps, {getPosts}) (Posts)
