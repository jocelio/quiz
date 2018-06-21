import React, { Component } from "react"
import { connect } from 'react-redux'
import _ from 'lodash'
import { setAnswerStatement } from '../../actions/quizActions'

class Answer extends Component {

  constructor() {
    super();
    this.state = {inputValue: '', isRightAnswer:false}
    this.timeout =  0;
  }

  setAnswerStatement(inputValue){
    this.props.setAnswerStatement(this.props.newQuiz, {...inputValue, correctAnswer: this.props.correctAnswer}, this.props.parentUid, this.props.uid)
  }

  onChange(event){
    const inputValue = event.target.value;
    this.setAnswerStatement({ inputValue })
  }

  render() {
    const {inputValue} = this.props.answerStatements || ''
    const {isRightAnswer} = this.props.answerStatements || false
    const filled = !_.isNil(this.props.answerStatements)
    return (
      <div className="row answer-row">

      <div className="col-md-8">
        <input type="text" className={`form-control ${this.props.correctAnswer?'correct-answer-input':'wrong-answer-input'}`} placeholder={this.props.correctAnswer?'Right Answer':'Answer'} defaultValue={inputValue}
        onBlur={event => this.onChange(event)}
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
