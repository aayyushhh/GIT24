import React from 'react'
import { CircularProgress } from '@mui/material';
import './Loader.css';

function Loader() {
  return (
    <div className="loader-container">
      <div className="circular-progress">
        <CircularProgress size={150} />
      </div>
    </div>
  )
}

export default Loader
