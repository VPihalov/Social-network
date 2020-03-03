import React, {Fragment} from 'react';

const NotFound = props => {
	return (<Fragment>
		<h1 className="x-large text-primary">
			<i className="fas fa-exclamation-triangle">Page Note Found</i>
		</h1>
		<p className="large">Sorry, this page does not exist</p>
	</Fragment>)
};

export default NotFound