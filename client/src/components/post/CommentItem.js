import React from 'react'
import Moment from 'react-moment'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {deleteComment} from '../../actions/post'

const CommentItem = ({
	postId,
  comment: {
		 text, name, avatar, user, date, _id
	},
	auth,
	deleteComment
}) => {

   return  <div className="post bg-white p-1 my-1">
   <div>
     <Link to={`/profile/${user}`}>
       <img
         className="round-img"
         src={avatar}
         alt=""
       />
       <h4>{name}</h4>
     </Link>
   </div>
   <div>
     <p className="my-1">
         {text}
     </p>
      <p className="post-date">
        Posted <Moment format='YYYY/MM/DD'>{date}</Moment>
     </p>
		 {auth.isAuthenticated && auth.user._id === user && 
			 <button 
			 	className='btn btn-danger'
				onClick={() => {deleteComment(postId, _id)}}
				>
				 <i className='fas fa-times'></i>
			</button>}
   </div>
 </div>
};

CommentItem.propTypes = {
	 comment: PropTypes.object.isRequired,
	 auth: PropTypes.object.isRequired,
	 postId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, {deleteComment}) (CommentItem)