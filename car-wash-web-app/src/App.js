import React, { Component } from 'react';
import './App.css';
import {Provider} from 'react-redux';
import store from './Store';
import Navbar from './Components/Navbar/Navbar';
import Aux from './HOC/AuxHOC';
import MainBanner from './Commons/MainBanner/MainBanner';
import ErrorPage from './Components/Error/Error';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Footer from './Components/Footer/Footer';
import Sidenav from './Components/Sidenav/Sidenav';
import Registration from './Components/Registration/Registration';
import Login from './Components/Login/Login';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router>
            <Aux>
              <Navbar />
              <Sidenav />
              <MainBanner />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/register' component={Registration}/>
                <Route exact path='/login' component={Login}/>
                <Route component={ErrorPage}/>
              </Switch>
              <Footer />
            </Aux>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
