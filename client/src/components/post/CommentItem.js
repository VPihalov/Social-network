import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

const CommentItem = ({
   comment
}) => {

   return  <div class="post bg-white p-1 my-1">
   <div>
     <a href="profile.html">
       <img
         class="round-img"
         src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
         alt=""
       />
       <h4>John Doe</h4>
     </a>
   </div>
   <div>
     <p class="my-1">
         {comment}
     </p>
      <p class="post-date">
         Posted on 04/16/2019
     </p>
   </div>
 </div>
};

CommentItem.propTypes = {
   
};

export default connect(null, null) (CommentItem)