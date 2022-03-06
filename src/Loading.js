import React from 'react';
import ReactLoading from 'react-loading';
import "./Loading.css"
const Loading = ({ type, color }) => (
    <ReactLoading type={type} color={color} className='loader' />
);
 
export default Loading;