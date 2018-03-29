import React, { Component } from 'react';

import Star from './Star';
import Button from './Button';
import Answer from './Answer';
import Numbers from './Numbers';
import DoneStatus from './DoneStatus';

class Game extends Component {
    constructor(props) {
        super();
        this.state = {
            total: Math.floor(Math.random() * 9) + 1,
            selectedNumbers: [],
            usedNumbers: [],
            isAnswerCorrect: null,
            redraws: 5,
            doneStatus: null
        }
    }

    possibleCombinationSum = function(arr, n) {
        if (arr.indexOf(n) >= 0) { return true; }
        if (arr[0] > n) { return false; }
        if (arr[arr.length - 1] > n) {
          arr.pop();
          return this.possibleCombinationSum(arr, n);
        }
        var listSize = arr.length, combinationsCount = (1 << listSize)
        for (var i = 1; i < combinationsCount ; i++ ) {
          var combinationSum = 0;
          for (var j=0 ; j < listSize ; j++) {
            if (i & (1 << j)) { combinationSum += arr[j]; }
          }
          if (n === combinationSum) { return true; }
        }
        return false;
    };

    selectNumber = (num) => {
        if(this.state.selectedNumbers.indexOf(num) >= 0) {
            return;
        }
        this.setState(prevState => ({
            isAnswerCorrect: null,
            selectedNumbers: prevState.selectedNumbers.concat(num)
        }));
    }

    unselectNumber = (num) => {
        this.setState(prevState => ({
            selectedNumbers: prevState.selectedNumbers.filter( number => number != num )
        }));
    }

    checkAnswer = () => {
        this.setState(prevState => ({
            isAnswerCorrect: null,
            isAnswerCorrect: prevState.total === prevState.selectedNumbers.reduce( (prev, curr) => prev + curr, 0 )
        }));
    }

    acceptAnswer = () => {
        this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            isAnswerCorrect: null,
            total: Math.floor(Math.random() * 9) + 1
        }), this.updateDoneStatus);
    }

    redrawStars = () => {
        if(this.state.redraws >= 1) {
            this.setState(prevState => ({
                total: Math.floor(Math.random() * 9) + 1,
                isAnswerCorrect: null,
                selectedNumbers: [],
                redraws: prevState.redraws - 1
            }), this.updateDoneStatus);
        }
    }

    possibleSolutions = ({total, usedNumbers}) => {
        const possbileNumbers = [...Array(9).keys()].map( num => num + 1 ).filter( num => usedNumbers.indexOf(num) === -1);

        return this.possibleCombinationSum(possbileNumbers, total);
    }

    getState = (prevState) => {
        if(prevState.usedNumbers.length === 9) {
            return 'Nice one !';
        }

        if(prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
            return 'Game over !';
        }
    }

    updateDoneStatus = () => {
        this.setState(prevState => ({
            doneStatus: this.getState(prevState)
        }));
    }

    render() {
        return(
            <div className="container">
                <h3>Play Nine</h3>
                <hr />
                <div className="row text-center">
                    <Star total={this.state.total} />
                    <Button 
                    selectedNumbers={this.state.selectedNumbers} 
                    isAnswerCorrect={this.state.isAnswerCorrect} 
                    checkAnswer={this.checkAnswer} 
                    acceptAnswer={this.acceptAnswer}
                    redrawStars={this.redrawStars}
                    redraws={this.state.redraws} />
                    <Answer selectedNumbers={this.state.selectedNumbers} unselectNumber={this.unselectNumber} />
                </div>
                <div className="row">
                    <div className="col-md-12">
                        {
                            this.state.doneStatus ? 
                            <DoneStatus doneStatus={this.doneStatus} /> :
                            <Numbers selectedNumbers={this.state.selectedNumbers} usedNumbers={this.state.usedNumbers} 
                        selectNumber={this.selectNumber} />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;