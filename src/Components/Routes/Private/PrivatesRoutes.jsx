import React from 'react';

import { Navigate, useLocation } from 'react-router';
import UseAuth from '../../../Hook/UseAuth';

const PrivateRoutes = ({children}) => {
    let {user, loading} = UseAuth()
    let location = useLocation()
    
    
    if(loading){
       return  <p>loadinggg</p>
    }
    
  if (!user) {
    return <Navigate state={{from:location?.pathname}} to="/register/login" replace />;
  }

    return children
      
};

export default PrivateRoutes;