import React from 'react';

const DoneStatus = (props) => {
    return(
        <div className="card">
            <div className="card-body text-center">
                <p>{props.doneStatus}</p>
            </div>
        </div>
    );
}

export default DoneStatus;