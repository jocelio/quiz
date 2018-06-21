import _ from 'lodash'
import uuidv1 from 'uuid/v1';
import CryptoJS from 'crypto-js'

export const CREATE_QUIZ = 'FETCH_QUIZ';
export const CREATE_QUESTION = 'CREATE_QUESTION'
export const SET_QUESTION_STATEMENT = 'SET_QUESTION_STATEMENT'
export const CREATE_ANSWER='CREATE_ANSWER'
export const SET_ANSWER_STATEMENT= 'SET_ANSWER_STATEMENT'
export const SAVE_QUIZ='SAVE_QUIZ';
export const LOAD_QUIZZES='LOAD_QUIZZES'

const KEY = '5db62d50-74ab-11e8-99c8-07a12d3b99f3'

export function createQuiz(quizName){
    return {
        type: CREATE_QUIZ,
        payload: { quizName, uid: uuidv1() }
    };
}

export function createQuestion(quiz, question){
    return {
        type: CREATE_QUESTION,
        payload: {...quiz, questions: [...quiz.questions || {}, question]}
    };
}

export function createAnswer(quiz, questionUid, answer){

    const q = _(quiz.questions)
        .filter(q => q.props.uid == questionUid)
        .map(q => {
          return (_.isArray(answer))
                    ?{...q, props: {...q.props, answers: [...q.props.answers || {}, ...answer]}}
                    :{...q, props: {...q.props, answers: [...q.props.answers || {}, answer]}}
        })
        .head()

    const questions = [...quiz.questions.filter(f => f.props.uid != questionUid) || {}, q]

    return {
        type: CREATE_ANSWER,
        payload: {...quiz, questions: _.sortBy(questions, q => q.props.uid)}
    };
}

export function setQuestionStatement(quiz, statement, uid){

    const q = _(quiz.questions)
                  .filter(q => q.props.uid == uid)
                  .map(q => ({...q, props: {...q.props, statement: statement}}))
                  .head();

    const questions = [...quiz.questions.filter(f => f.props.uid != uid) || {}, q]

    return {
        type: SET_QUESTION_STATEMENT,
        payload: {...quiz, questions: _.sortBy(questions, q => q.props.uid)}
    };
}

export function setAnswerStatement(quiz, answerStatements, questionUid, answerUid){

  const question = _(quiz.questions)
                .filter(q => q.props.uid == questionUid)
                .head();

  const answer = _(question.props.answers)
                .filter(a => a.props.uid == answerUid)
                .map(q => ({...q, props: {...q.props, answerStatements: answerStatements}}))
                .head();

  const otherAnswers = _(question.props.answers)
                .filter(a => a.props.uid != answerUid).value()

  const allAnswer = _.sortBy([...otherAnswers, answer], a => a.props.uid)

  const newQuestion = {...question, props: {...question.props, answers: allAnswer}};

  const questions = [...quiz.questions.filter(f => f.props.uid != questionUid) || {}, newQuestion]

  return {
      type: SET_ANSWER_STATEMENT,
      payload: {...quiz, questions: _.sortBy(questions, q => q.props.uid)}
  };
}

export function saveQuiz(quiz){
  
  const ciphertext = localStorage.getItem('quizzes');

  const quizzes = _.isNil(ciphertext)? []: decrypt(ciphertext)

  localStorage.setItem('quizzes', encrypt([...quizzes, quiz]))
  return {
      type: SAVE_QUIZ,
      payload: quizzes
  };

}

export function loadQuizzes(){
  const ciphertext = localStorage.getItem('quizzes');

  const quizzes = _.isNil(ciphertext)? []: decrypt(ciphertext)

  return {
      type: LOAD_QUIZZES,
      payload: quizzes
  };

}


function encrypt(obj){
    return CryptoJS.AES.encrypt(JSON.stringify(obj), KEY);
}

function decrypt(ciphertext){
  const bytes = CryptoJS.AES.decrypt(ciphertext.toString(), KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
