import React, { Component } from "react"
import { connect } from 'react-redux'
import _ from 'lodash'
import uuidv1 from 'uuid/v1'
import { Link } from 'react-router-dom'


class Question extends Component {

  constructor() {
    super()
    this.state = {answered: false}
  }

  doAnswer(answer){
      const {question} = this.props
      const correct = _(question.answers).filter(f => f.correctAnswer).head()
      this.setState({answered:true, answer, correct})
  }

  render() {

    const {question, index} = this.props
    const {answer, correct} = this.state
    return (
        <div>
            <h3>{`${index+1}. ${question.statement}`}</h3>
            <div className="answer-container">
            {_(question.answers).map(a => {
              return (<div key={uuidv1()}>
                        {!this.state.answered ?
                          <div>
                            <input type="radio" value="1" name={`${question.uid}[]`} onChange={() => this.doAnswer(a)}/>
                            <span> - {a.answerStatement}</span>
                          </div>
                          :
                          <div>
                            {a.correctAnswer
                                ?<div>
                                    <input type="radio" checked={a.answerStatement == answer.answerStatement} disabled={true}/>
                                    <span className={'correct-answer'}><strong> - {a.answerStatement}</strong></span>
                                </div>
                                :<div>
                                    <input type="radio" checked={a.answerStatement == answer.answerStatement} disabled={true}/>
                                    <span className={(a.answerStatement == answer.answerStatement)  ? 'wrong-answer':'fade-answer'}><strong> - {a.answerStatement}</strong></span>
                                 </div>
                            }
                          </div>
                        }
                    </div>)
            }).value()}
            </div>
        </div>
    );
  }

}

function mapStateToProps(state){
    return state
}

export default connect(mapStateToProps, null)(Question);
