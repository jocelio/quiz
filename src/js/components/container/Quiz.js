import React, { Component } from "react";
import { connect } from 'react-redux';
import _ from 'lodash'
import uuidv1 from 'uuid/v1';
import Question from './Question'
import { createQuiz, createQuestion } from '../../actions/quizActions'


class Quiz extends Component {

  constructor() {
    super();
    this.state = {questions: [], started: false}
  }

  addQuestion(){
      this.props.createQuestion(this.props.newQuiz, <Question uid={uuidv1()}/>)
  }

  createQuiz(){
     this.props.createQuiz(this.state.quizName);
     this.setState({started:true})
  }

  save(){
    alert('oiz')
  }

  render() {
    return (
        <div>

        <h1> New Quiz </h1>

        <h2>
          Quiz Name:
          <input type="text" className="form-control" disabled={this.state.started}
          onChange={event => this.setState({quizName: event.target.value})}/>
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
            <button className="btn btn-primary" type="submit">Save</button>

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

export default connect(mapStateToProps, {createQuiz, createQuestion})(Quiz);
