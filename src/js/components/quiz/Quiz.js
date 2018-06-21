import React, { Component } from "react";
import { connect } from 'react-redux';
import _ from 'lodash'
import uuidv1 from 'uuid/v1';
import { loadQuizzes } from '../../actions/quizActions'
import Question from './Question'


class Quiz extends Component {

  constructor() {
    super();
  }

  componentDidMount(){
      this.props.loadQuizzes()
  }

  render() {

    const {uid} = this.props.match.params

    const quiz  = _(this.props.quizzes).filter(q => q.uid == uid).head()

    if(_.isNil(quiz)) return null;

    return (
        <div>
          <form>
            <h1>{quiz.quizName}</h1>
            {quiz.questions.map((q, i) => <Question question={q} key={i} index={i}/>)}
          </form>
        </div>
    );
  }

}

function mapStateToProps(state){
    return {quizzes: state.quizState.quizzes};
}

export default connect(mapStateToProps, { loadQuizzes })(Quiz);
