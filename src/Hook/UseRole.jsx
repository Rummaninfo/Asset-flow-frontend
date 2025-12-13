import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAuth from './UseAuth';
import UseAxios from './UseAxios';



const UseRole = () => {
    let {user} = UseAuth()
    let axiosSecure = UseAxios()
     let {isLoading, data: role = "user"} = useQuery({
        queryKey: ["user", user?.email],
        queryFn: async()=>{
          let res =  await  axiosSecure.get(`/user/${user.email}/role`)
        return res.data

        }
     })
    return {isLoading,role}
};

export default UseRole;