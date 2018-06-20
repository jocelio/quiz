import _ from 'lodash'

export const CREATE_QUIZ = 'FETCH_QUIZ';
export const CREATE_QUESTION = 'CREATE_QUESTION'
export const SET_QUESTION_STATEMENT = 'SET_QUESTION_STATEMENT'
export const CREATE_ANSWER='CREATE_ANSWER'
export const SET_ANSWER_STATEMENT= 'SET_ANSWER_STATEMENT'

export function createQuiz(quizName){
    return {
        type: CREATE_QUIZ,
        payload: {quizName}
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
        .map(q => ({...q, props: {...q.props, answers: [...q.props.answers || {}, answer]}}))
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
