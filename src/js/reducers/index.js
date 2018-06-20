import { combineReducers } from 'redux'
import QuizReducer from './quizReducer'

const rootReducer = combineReducers({
    state: (state = {}) => state,
    quizState: QuizReducer
});

export default rootReducer;
