import React, { Component } from "react";
import { connect } from 'react-redux';
import { setAnswerStatement } from '../../actions/quizActions'

class Answer extends Component {

  constructor() {
    super();
    this.state = {inputValue: '', isRightAnswer:false}
  }

  setAnswerStatement(){
    this.props.setAnswerStatement(this.props.newQuiz, {...this.state, correctAnswer: this.props.correctAnswer}, this.props.parentUid, this.props.uid)
  }

  render() {
    const {inputValue} = this.props.answerStatements || ''
    const {isRightAnswer} = this.props.answerStatements || false
    const filled = !_.isNil(this.props.answerStatements)
    return (
      <div className="row answer-row">

      <div className="col-md-8">
        <input type="text" className={`form-control ${this.props.correctAnswer?'correct-answer-input':'wrong-answer-input'}`} placeholder={this.props.correctAnswer?'Right Answer':'Answer'} defaultValue={inputValue}
        onChange={event => this.setState({ inputValue: event.target.value })}
        
        onBlur={() => this.setAnswerStatement()}
        required/>
      </div>

      </div>
    );
  }

}

function mapStateToProps(state){
    return {newQuiz: state.quizState.newQuiz};
}

export default connect(mapStateToProps, { setAnswerStatement })(Answer);
