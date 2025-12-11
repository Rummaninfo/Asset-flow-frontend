import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext';

const UseAuth = () => {
   
     let authone = use(AuthContext)
    
    return authone
};

export default UseAuth;