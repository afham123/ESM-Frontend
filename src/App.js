import './App.css';
import { MainTable } from './content/MainTable';
import { Buffer } from 'buffer';
import process from 'process';
import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginPage from './content/login';

window.Buffer = Buffer;

window.process = process;


function App() {
  return (
    <Router>
      <Routes path="/" element={<LoginPage/>}/>
      <Routes path="/table" element={<MainTable/>}/>
    </Router>
  );
}

export default App;
