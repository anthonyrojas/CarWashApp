import React, { Component } from 'react';
import './App.css';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Home />
        <Footer />
      </div>
    );
  }
}

export default App;
