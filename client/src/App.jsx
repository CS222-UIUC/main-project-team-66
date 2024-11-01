import { Navigate, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios";
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import RefreshHandler from './RefreshHandler';
import Navbar from './pages/Navbar';
import Create from './pages/Create';

function App() {

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
 
  };

  useEffect(() =>{
    fetchAPI();
  }, []);

  const[isAuthenticated, setIsAuthenticated] = useState(false);

  // PrivateRoutes ensure that a user is logged in before visitng page
  const PrivateRoute = ({element})=> {
    return isAuthenticated ? element : <Navigate to="/login"/>
  }
  return (
    <div className='App'>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate to="/login"/>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<PrivateRoute element={<Home />}/>} />
        <Route path='/create' element={<PrivateRoute element={<Create />}/>} />
      </Routes>
    </div>
  )
}

export default App