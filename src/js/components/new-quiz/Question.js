import React, { Component } from "react";
import { connect } from 'react-redux';
import _ from 'lodash'
import uuidv1 from 'uuid/v1';
import Answer from './Answer'
import { setQuestionStatement, createAnswer } from '../../actions/quizActions'

class Question extends Component {

  constructor() {
    super();
    this.state = {inputValue: ''}
  }

  addAnswer(){
    const question = _(this.props.newQuiz.questions).filter(q => q.props.uid == this.props.uid ).head()
    const answers = _.isNil(question.props.answers)? _.range(0, 4)
    .map(i => <Answer correctAnswer={i == 0} key={i} uid={uuidv1()} parentUid={this.props.uid}/>) : <Answer uid={uuidv1()} parentUid={this.props.uid}/>
    this.props.createAnswer(this.props.newQuiz, this.props.uid, answers)
  }

  setQuestionStatement(statement){
    this.props.setQuestionStatement(this.props.newQuiz, statement, this.props.uid)
  }

  render() {
    return (

        <div className="row">

          <div className="col-md-12">

            <strong>Question</strong>

            <input type="statement" className="form-control" id="question-statement" placeholder="Question text..."
            defaultValue={this.props.statement}
            onBlur={event => this.setQuestionStatement(event.target.value)}/>

            <strong>Answers</strong>
            {this.renderAnswer()}

         </div>
         <div className="col-md-12">
            <a className="btn btn-default" onClick={() => this.addAnswer()}>Add Answer</a>
          </div>
        </div>
    );
  }

  renderAnswer(){
    /* encontra no redux a questao referente a si mesmo */
    const self = _(this.props.newQuiz.questions).filter(q => q.props.uid == this.props.uid).head();

    if(_.isNil(self.props.answers)){
      return
    }

    /* renderiza as respostas referentes questao */
    return(
      <div>
        { _.map(self.props.answers, (a, i) =>
          <span key={i}>
            {a}
          </span>
        )}
      </div>
    )
  }

}

function mapStateToProps(state){
    return {newQuiz: state.quizState.newQuiz};
}

export default connect(mapStateToProps, {setQuestionStatement, createAnswer})(Question);
