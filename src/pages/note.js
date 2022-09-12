import React from 'react';
import {Redirect} from 'react-router-dom';

function Note ({authorized}){

  if(!authorized){
    return <Redirect to="/"/>
  }
  return (
    <div>
      Note
    </div>
  )
};

export default Note;
