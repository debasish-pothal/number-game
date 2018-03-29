import React from 'react';

const Answer = (props) => {
    return(
        <div className="col-md-5">
            { props.selectedNumbers.map( (snumber, i) => <span key={i} onClick={() => props.unselectNumber(snumber)}>{snumber}</span> ) }
        </div>
    );
}

export default Answer;