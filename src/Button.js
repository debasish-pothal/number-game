import React from 'react';

const Button = (props) => {
    let button;

    switch(props.isAnswerCorrect) {
        case true:
            button = <button onClick={ () => props.acceptAnswer() } className="btn btn-success btn-lg"><i className="fa fa-check"></i></button>
            break;
        case false:
            button = <button className="btn btn-danger btn-lg"><i className="fa fa-times"></i></button>
            break;
        default:
            button = <button onClick={ () => props.checkAnswer() } disabled={props.selectedNumbers.length === 0} className="btn btn-default btn-lg">=</button>
            break;
    }

    return(
        <div className="col-md-2">
            {button}

            <br /><br />
            
            <button disabled={props.redraws === 0} onClick={() => props.redrawStars()} className="btn btn-warning btn-sm"><i className="fa fa-refresh"></i> <span className="badge badge-dark">{props.redraws}</span></button>
        </div>
    );
}

export default Button;