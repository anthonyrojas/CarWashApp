import React, { Component } from 'react';
import './App.css';
import {Provider} from 'react-redux';
import store from './Store';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import Sidenav from './Components/Sidenav/Sidenav';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Navbar />
          <Sidenav />
          <Home />
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;
