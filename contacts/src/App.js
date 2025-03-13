import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Contact from './Contact';
import CreateContact from './CreateContact';
import EditContact from './EditContact';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome</h2>
        </div> <br/>

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Contact />}></Route>
            <Route path='/add' element={<CreateContact />}></Route>
            <Route path='/edit/:contact_phoneid' element={<EditContact />}></Route>
            <Route path='/upload' element={<EditContact />}></Route>
          </Routes>
        </BrowserRouter>

      </div>
    );
  }
}

 export default App;
