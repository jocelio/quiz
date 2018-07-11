import React, { Component } from 'react';
import NewQuiz from "./js/components/new-quiz/NewQuiz";
import Quiz from "./js/components/quiz/Quiz";
import Home from "./js/components/quiz/Home";
import { Switch, Route, HashRouter, Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

/*
* Usando react-router para organizar as paginas de forma adequada.
*/

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
      <HashRouter>
      <div id="wrapper" className="toggled">
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
          <ToastContainer />
      </div>
      </HashRouter>
    );
  }

}

export default App;
