/*
* root reducer, responsável por combinar e tornar disponíveis todos os reducers
*/
import { combineReducers } from 'redux'
import QuizReducer from './quizReducer'

const rootReducer = combineReducers({
    state: (state = {}) => state,
    quizState: QuizReducer
});

export default rootReducer;
