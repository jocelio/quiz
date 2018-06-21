import React, { Component } from "react";
import { connect } from 'react-redux';
import _ from 'lodash'
import uuidv1 from 'uuid/v1';
import Question from './Question'
import { createQuiz, createQuestion, saveQuiz } from '../../actions/quizActions'


class NewQuiz extends Component {

  constructor() {
    super();
    this.state = {questions: [], started: false, quizName: ''}
  }

  addQuestion(){
      this.props.createQuestion(this.props.newQuiz, <Question uid={uuidv1()}/>)
  }

  createQuiz(){
      if(_.isEmpty(this.state.quizName)){
        alert('Quiz name is required')
        return;
      }
     this.props.createQuiz(this.state.quizName);
     this.setState({started:true})
  }

  save(){

    const questions = _(this.props.newQuiz.questions).map(q => {
        const answers = _(q.props.answers).shuffle().map(a => {
           const {inputValue, correctAnswer} = a.props.answerStatements
           return {answerStatement: inputValue, correctAnswer }
        }).value()
        const {statement, uid} = q.props
        return {statement, answers, uid}
    }).value()

    const noAnswers = _(questions).filter(q => _.isEmpty(q.answers)).value();
    console.log(questions)
    console.log(noAnswers)
    if(!_.isEmpty(noAnswers)){
      alert('All questions must have its answers.')
      return;
    }

    this.setState({started: false, quizName: ''})

    const {quizName, uid} = this.props.newQuiz

    this.props.saveQuiz({quizName, uid, questions})

    alert('Quiz saved!')
  }

  render() {
    return (
        <div>

        <h1> New Quiz </h1>

        <h2>
          Quiz Name:
          {this.state.started
            ? <span> {this.state.quizName}</span>
            : <input type="text" className="form-control"
            onChange={event => this.setState({quizName: event.target.value})}/>
          }
        </h2>

        {!this.state.started &&
            <button className="btn btn-primary" type="submit" onClick={() => this.createQuiz()}>Create</button>
        }
        <form onSubmit={() => this.save()}>
        {this.state.started &&
          <div>
            {_.map(this.props.newQuiz.questions, q =>
              <div key={uuidv1()} className="question-container">
                {q}
              </div>
            )}

            <button className="btn btn-primary" type="button" onClick={() => this.addQuestion()}>Add Question</button>
            <hr/>
            {!_.isEmpty(this.props.newQuiz.questions) &&
            <button className="btn btn-primary" type="submit">Save</button>
            }

          </div>
        }
        </form>
        </div>
    );
  }

}

function mapStateToProps(state){
    return {newQuiz: state.quizState.newQuiz};
}

export default connect(mapStateToProps, {createQuiz, createQuestion, saveQuiz})(NewQuiz);
