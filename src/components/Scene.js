import React from 'react';

const Scene = ({scene}) => {
  return (
    <div className="tile">
      <div className="tile-header">
        {scene.title}
      </div>
      {scene.notes}
    </div>
  )
}

export default Scene
