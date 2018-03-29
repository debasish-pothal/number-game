import React from 'react';

const Numbers = (props) => {
    const setClassName = (num) => {
        if( props.usedNumbers.indexOf(num) >= 0 ) {
            return 'used';
        }

        if( props.selectedNumbers.indexOf(num) >= 0 ) {
            return 'selected';
        }
    }

    return(
        <div className="card">
            <div className="card-body text-center">
                { [...Array(9).keys()].map(
                    i => <span key={i} className={setClassName(i+1)} onClick={() => props.selectNumber(i+1)}>{i+1}</span>
                ) }
            </div>
        </div>
    );
}

export default Numbers;