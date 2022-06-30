import React from 'react';
import './style.css';

const ErrorIndicator = () => {
	return (
		<div className='error-indicator'>
			<span >Oops!</span>
			<span>something has gone terribly wrong</span>
			<span>(but we already start to fix it)</span>
		</div>
	);
};

export default ErrorIndicator;
