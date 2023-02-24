import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';


const Logo = () => {
	return(
		<div className=' ma4 mt0 '>
			<Tilt className="logo br2 shadow-2">
      			<div>👀</div>
    		</Tilt>
		</div>
		)
};


export default Logo;