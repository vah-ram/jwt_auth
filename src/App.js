import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from './registration/register';
import Login from './registration/login';
import Project from './Project';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Project/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
};

export default App;
