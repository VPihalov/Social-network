import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {createPost} from '../../actions/post'

const AddPost = ({
   createPost
}) => {

   const [text, setText] = useState('');

   const onSubmit = e => {
      e.preventDefault();
      createPost({text})
      setText('')
   };

   return <Fragment>
      <div className="bg-primary p" >
        <h3>Create a post...</h3>
      </div>
      <form className="form my-1" onSubmit = {e => onSubmit(e)}>
         <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            value={text}
            required
            onChange = {e => {
               setText(e.target.value);
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

AddPost.propTypes = {
   createPost: PropTypes.func.isRequired
}

export default connect(null, {
   createPost
}) (AddPost)