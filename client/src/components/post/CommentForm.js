import React, {useState, Fragment} from 'react'
import {connect} from 'react-redux'

const CommentForm = ({

}) => {

	const [comment, setComment] = useState('');
	const onSubmit = e => {}

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
            value={comment}
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
}

export default connect() (CommentForm)