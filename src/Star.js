import React from 'react';

const Star = (props) => {
    return(
        <div className="col-md-5">
            { [...Array( props.total  ).keys()].map( i => <i key={i} className="fa fa-star fa-2x"></i> ) }
        </div>
    );
}

export default Star;