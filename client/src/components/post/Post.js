import React, {useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getPost} from '../../actions/post'
import Spinner from '../layout/Spinner'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'

const Post = ({
	getPost,
	match,
	post: {
		loading, post
	}
}) => {

	useEffect(() => {
		getPost(match.params.id)
	}, [getPost, match]) 	

	return loading || post === null ? (<Spinner/>) : (
			<Fragment>
				<Link to='/posts' className='btn'>Back to posts</Link>
				<PostItem post={post} showAction={false}/>
				<CommentForm postId={match.params.id}/>
			</Fragment>
		)
	
}

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	post: state.post
})


export default connect(mapStateToProps, {getPost}) (Post)