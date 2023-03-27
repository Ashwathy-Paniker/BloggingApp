import React,{Suspense} from 'react';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";

const Login= React.lazy(()=>import ('./component/Authentication/Login'));
const Addpost= React.lazy(()=>import('./component/Post/Addpost'));
const Myblogs= React.lazy(()=>import('./component/Dashboard/Myblogs'));
const Allblogs= React.lazy(()=>import('./component/Dashboard/Allblogs'));
const Previewblog= React.lazy(()=>import('./component/Dashboard/Previewblog'));
const Register= React.lazy(()=>import('./component/Authentication/Register'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div><br/><img src="./images/load1.gif" alt="Loading..." /><h1>Please wait ...</h1></div>}>
  <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Allblogs/>}/>
        <Route path="/myblogs" element={<Myblogs/>}/>
        <Route path="/register" element={<Register/>} />
        <Route path="/post" element={<Addpost/>} />
        <Route path="/preview" element={<Previewblog/>} />
      </Routes>
  </BrowserRouter>
  </Suspense>
    </div>
  );
}

export default App;
