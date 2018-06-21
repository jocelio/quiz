import React, { Component } from 'react';
import NewQuiz from "./js/components/new-quiz/NewQuiz";
import Quiz from "./js/components/quiz/Quiz";
import Home from "./js/components/quiz/Home";
import { Switch, Route, Link } from 'react-router-dom'
import './App.css';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/quiz/:uid' component={Quiz}/>
      <Route exact path='/new-quiz' component={NewQuiz}/>
    </Switch>
  </main>
)

class App extends Component {

  render() {
    return (
      <div id="wrapper">
          <div id="sidebar-wrapper">
              <ul className="sidebar-nav">

                  <li className="sidebar-brand">
                      <a href="#">
                          Quiz
                      </a>
                  </li>

                  <li><Link to='/'>Home</Link></li>
                  <li><Link to='/new-quiz'>Create New Quiz</Link></li>

              </ul>
          </div>
          <div id="page-content-wrapper">
              <div className="container-fluid">
                    <Main />
              </div>
          </div>
      </div>
    );
  }
  componentDidMount(){
    $("#wrapper").toggleClass("toggled");
  }
}

export default App;
