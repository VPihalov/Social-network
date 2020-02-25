import React from 'react'
import Moment from 'react-moment'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {deleteComment} from '../../actions/post'

const CommentItem = ({
   comment: {
		 text, name, avatar, user, date
	 }
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
   </div>
 </div>
};

CommentItem.propTypes = {
   comment: PropTypes.object.isRequired
};

export default connect(null, {deleteComment}) (CommentItem)