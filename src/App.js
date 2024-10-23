import './App.css';
import { MainTable } from './content/MainTable';
import { Buffer } from 'buffer';
import process from 'process';
window.Buffer = Buffer;

window.process = process;


function App() {
  return (
    <MainTable></MainTable>
  );
}

export default App;
