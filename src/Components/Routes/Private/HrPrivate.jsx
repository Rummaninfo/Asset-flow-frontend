import React from 'react';
import UseAuth from '../../../Hook/UseAuth';
import UseRole from '../../../Hook/UseRole';
import Forbidden from '../../Forbidden ';
import { useNavigate } from 'react-router';

const HrPrivate = ({children}) => {
    let { loading} = UseAuth()
    let {isLoading,role} = UseRole()
    
 

      if(loading || isLoading){
       return  <p>loadinggg</p>
    }

    if(role !== "hr"){
        return <Forbidden></Forbidden>
    }
    return children
};

export default HrPrivate;