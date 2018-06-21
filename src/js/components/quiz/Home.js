import React, { Component } from "react"
import { connect } from 'react-redux'
import _ from 'lodash'
import uuidv1 from 'uuid/v1'
import { Link } from 'react-router-dom'
import { loadQuizzes } from '../../actions/quizActions'


class Home extends Component {

  constructor() {
    super()
  }

  componentDidMount(){
      this.props.loadQuizzes()
  }

  render() {
    return (
        <div>
          <ul>
              {_.map(this.props.quizzes, q => (<li key={q.uid}><Link to={`/quiz/${q.uid}`}>{q.quizName}</Link></li>))}
          </ul>
        </div>
    );
  }

}

function mapStateToProps(state){
    return {quizzes: state.quizState.quizzes};
}

export default connect(mapStateToProps, {loadQuizzes})(Home);
