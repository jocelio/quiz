import React, { Component } from "react";
import { connect } from 'react-redux';
import { setAnswerStatement } from '../../actions/quizActions'

class Answer extends Component {

  constructor() {
    super();
    this.state = {inputValue: '', isRightAnswer:false}
  }

  setAnswerStatement(){
    this.props.setAnswerStatement(this.props.newQuiz, {...this.state, isRightAnswer}, this.props.parentUid, this.props.uid)
  }

  onChangeSelect(event){

    if(_.isEmpty(this.state.inputValue) || _.isNil(event.target.value)){
      return;
    }
    this.setAnswerStatement(event.target.value);
  }

  render() {
    const {inputValue} = this.props.answerStatements || ''
    const {isRightAnswer} = this.props.answerStatements || false
    const filled = !_.isNil(this.props.answerStatements)
    return (
      <div className="row answer-row">

      <div className="col-md-8">
        <input type="text" className="form-control" placeholder="Answer" defaultValue={inputValue}
        onChange={event => this.setState({ inputValue: event.target.value })} disabled={filled}
        required/>
      </div>

      <div className="col-md-2 right-response-check" >
        <select className="form-control" onChange={event => this.onChangeSelect(event)}
        defaultValue={isRightAnswer} disabled={filled} required>
            <option defaultValue={null}>-- Select--</option>
            <option defaultValue={false}>Wrong</option>
            <option defaultValue={true}>Right</option>
        </select>
      </div>

      {filled &&
      <div className="col-md-2 right-response-check" >
        <button type="button" className="btn btn-default" >
          Remove
        </button>
      </div>
    }



      </div>
    );
  }

}

function mapStateToProps(state){
    return {newQuiz: state.quizState.newQuiz};
}

export default connect(mapStateToProps, { setAnswerStatement })(Answer);
