import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

// Function to prevent logged in user from going to login/register pages

function RefreshHandler({setIsAuthenticated}) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=> {
        if(localStorage.getItem('token')) {
            setIsAuthenticated(true);
            if(location.pathname === '/' ||
                location.pathname === '/login' ||
                location.pathname === '/register'
            ){
                console.log("Navigated to home because of RefreshHandler");
                navigate('/home', {replace: false});
            }
        }
    },[location, navigate, setIsAuthenticated])
  return (
    null
  )
}

export default RefreshHandler