import React, {useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createComment} from '../../actions/post'

const CommentForm = ({
	createComment,
	postId
}) => {

	const [text, setComment] = useState('');
	const onSubmit = e => {
		e.preventDefault();
		createComment(postId, {text});
		setComment('')
	}

	return <Fragment>
		  <div className="bg-primary p" >
        <h3>Leave your comment...</h3>
      </div>
      <form className="form my-1" onSubmit = {e => onSubmit(e)}>
         <textarea
            name="comment"
            cols="30"
            rows="5"
            placeholder="Print your comment..."
            value={text}
            required
            onChange = {e => {
							setComment(e.target.value);
            }}
      ></textarea>
         <input 
            type="submit" 
            className="btn btn-dark my-1" 
            value="Submit" 
         />
      </form>
	</Fragment>
};

CommentForm.protoTypes = {
	createComment: PropTypes.func.isRequired
};

export default connect(null, {createComment}) (CommentForm)