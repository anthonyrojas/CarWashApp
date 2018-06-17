import React, { Component } from 'react';
import './App.css';
import {Provider} from 'react-redux';
import store from './Store';
import Navbar from './Components/Navbar/Navbar';
import Aux from './HOC/AuxHOC';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Footer from './Components/Footer/Footer';
import Sidenav from './Components/Sidenav/Sidenav';
import {BrowserRouter as Router, Route} from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router>
            <Aux>
              <Navbar />
              <Sidenav />
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
              <Footer />
            </Aux>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
