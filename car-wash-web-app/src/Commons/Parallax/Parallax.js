import React from 'react';
import './Parallax.css';
const parallax = (props) =>(
    <div className='parallax' style={{backgroundImage: `url(${props.image})`}}>
    </div>
);
export default parallax;