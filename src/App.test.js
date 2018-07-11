import React from 'react';
import Enzyme from 'enzyme';
import { expect } from 'chai';
import { shallow, render, mount } from 'enzyme';
import sinon from 'sinon';
import ReduxPromise from 'redux-promise';
import configureMockStore from 'redux-mock-store'
import Adapter from 'enzyme-adapter-react-16';

import Home from './js/components/quiz/Home'
import Quiz from './js/components/quiz/Quiz'
import Question from './js/components/quiz/Question'

import NewQuiz from './js/components/new-quiz/NewQuiz'

Enzyme.configure({ adapter: new Adapter() });

const middlewares = [ReduxPromise]
const mockStore = configureMockStore(middlewares)


describe('<Home />', () => {
  it('renders Home components', () => {
    const wrapper = render(<Home store={mockStore({ quizState: {} })}/>);
    expect(wrapper.text()).to.contain('Quiz');
  });
});

describe('<Quiz />', () => {

  it('renders Quiz components', () => {

    const quizState = {quizzes: [{uid:1, quizName: 'Quiz test', questions: []}]}
    const wrapper = render(<Quiz match={{params: {uid:1}}} store={mockStore({ quizState })}/>);

    expect(wrapper.text()).to.contain('Quiz test');
  });

});

describe('<Quiz /> -> <Question />', () => {

  it('renders Question components', () => {

    const question = {statement: "Quantos títulos mundiais tem a Alemanha?", answers:
                            [{answerStatement: "1", correctAnswer: false}
                            ,{answerStatement: "2", correctAnswer: false}
                            ,{answerStatement: "4", correctAnswer: true}
                            ,{answerStatement: "3", correctAnswer: false}]
                      , uid: "7d6056e0-74d2-11e8-b7fa-7da34afc1e23"}
    const quizState = {quizzes: [{uid:1, quizName: 'Quiz test', questions: []}]}
    const wrapper = render(<Question question={question} index={0} store={mockStore({ quizState })}/>);

    expect(wrapper.text()).to.contain(`${1}. ${question.statement}`);
    expect(wrapper.text()).to.contain(question.answers[0].answerStatement);
    expect(wrapper.text()).to.contain(question.answers[1].answerStatement);
    expect(wrapper.text()).to.contain(question.answers[2].answerStatement);

  });

});


describe('<NewQuiz />', () => {

  it('renders NewQuiz components', () => {

    const quizState = {newQuiz: {}}
    const wrapper = render(<NewQuiz store={mockStore({ quizState })}/>);

    expect(wrapper.text()).to.contain('New Quiz');
  });

  it('simulates click New Quiz button', () => {
    const onButtonClick = sinon.spy();

    const wrapper = mount(<NewQuiz store={mockStore({ quizState: {newQuiz: {questions:[]}} })}/>);
    wrapper.setProps({ createQuiz: onButtonClick });
    wrapper.setState({quizName: 'asds'})
    wrapper.find('button').simulate('click');
    expect(onButtonClick).to.have.property('callCount', 0);

  });

});
