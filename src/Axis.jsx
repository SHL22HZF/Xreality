import React from 'react'

const Axis = () => {
  return (
      <a-entity
        line="start: -9.2 -0.7 -8.5; end: -9.2 17 -8.5"
        line__2="start: 13.5 -0.7 -8.5; end: 13.5 17 -8.5"
        line__3="start: 13.5 -0.7 8.5; end: 13.5 17 8.5"
      ></a-entity>
  );
}

export default Axis