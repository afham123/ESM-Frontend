import './App.css';
import { MainTable } from './content/MainTable';
import { Buffer } from 'buffer';
import process from 'process';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginPage from './content/login';

window.Buffer = Buffer;

window.process = process;


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/table" element={<MainTable/>}/>
      </Routes>
    </Router>
  );
}

export default App;
