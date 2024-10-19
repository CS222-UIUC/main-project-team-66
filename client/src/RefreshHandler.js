import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
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
                navigate('/home', {replace: false});
            }
        }
    },[location, navigate, setIsAuthenticated])
  return (
    null
  )
}
RefreshHandler.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired
};

export default RefreshHandler