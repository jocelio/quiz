import React, { Component } from 'react';
import FormContainer from "./js/components/container/FormContainer";
import Quiz from "./js/components/container/Quiz";
import { Switch, Route, Link } from 'react-router-dom'
import './App.css';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={FormContainer}/>
      <Route exact path='/quiz' component={Quiz}/>
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
                  <li><Link to='/quiz'>New Quiz</Link></li>

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
