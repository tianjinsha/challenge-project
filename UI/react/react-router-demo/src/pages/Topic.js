import React from 'react';

const Topic =({match })=>{
    return (
        <div>
          <h3>Requested Param: {match.params.id}</h3>
        </div>
    )
}

export default Topic;