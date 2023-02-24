import React, { useState } from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import transparentLogo from './logo_transparent.png';


const Logo = () => {
 
	const [scale, setScale] = useState(1.15);
	return(
		<div className=' ma4 mt0 '>
			<Tilt className="logo tilt-scale br2 shadow-2" scale={scale} transitionSpeed={2500}>
      			<div><img src={transparentLogo} alt='Smart Brain'/></div>
    		</Tilt>
		</div>
		)
};


export default Logo;