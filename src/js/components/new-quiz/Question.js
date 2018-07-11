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
    /* pega dentre as questoes no redux aquela que é correspondente a essa instancia */
    const question = _(this.props.newQuiz.questions).filter(q => q.props.uid == this.props.uid ).head()
    /* se a questao ainda nao tiver nenhuma resposta, adiciona campos de resposta, sendo um deles a resposta correta, caso contrário adiciona apenas um novo compo de resposta errada */
    const answers = _.isNil(question.props.answers)? _.range(0, 4)
    .map(i => <Answer correctAnswer={i == 0} key={i} uid={uuidv1()} parentUid={this.props.uid}/>) : <Answer uid={uuidv1()} parentUid={this.props.uid}/>
    /* passa tudo para o redux */
    this.props.createAnswer(this.props.newQuiz, this.props.uid, answers)
  }

  /* método usado para settar no redux o texto da questao */
  setQuestionStatement(statement){
    this.props.setQuestionStatement(this.props.newQuiz, statement, this.props.uid)
  }

  render() {
    return (

        <div className="row">

          <div className="col-md-12">

            <strong>Question</strong>

            <input type="text" className="form-control question-statement" placeholder="Question text..."
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
