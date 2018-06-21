import { CREATE_QUIZ
        , CREATE_QUESTION
        , SET_QUESTION_STATEMENT
        , CREATE_ANSWER
        , SET_ANSWER_STATEMENT
        , SAVE_QUIZ
        , LOAD_QUIZZES } from '../actions/quizActions'

export default (state = [], action) => {

    switch (action.type) {
        case CREATE_QUIZ:
            return {newQuiz: action.payload}
        case CREATE_QUESTION:
            return {newQuiz: action.payload}
        case SET_QUESTION_STATEMENT:
            return {newQuiz: action.payload}
        case CREATE_ANSWER:
            return {newQuiz: action.payload}
        case SET_ANSWER_STATEMENT:
            return {newQuiz: action.payload}
        case SAVE_QUIZ:
            return {newQuiz:{questions: []}, quizzes: action.payload}
        case LOAD_QUIZZES:
            return {quizzes: action.payload}

        default:
            return state;
    }

};
