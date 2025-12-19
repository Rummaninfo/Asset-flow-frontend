import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import UseAxios from '../../../../Hook/UseAxios';

const PaymentSucess = () => {
    let [searchParams] = useSearchParams()
    let axiosSecure = UseAxios()
    console.log(searchParams)
    let sessionId = searchParams.get("session_id")
    console.log(sessionId)

    useEffect(()=>{
         if(sessionId){
           axiosSecure.patch(`payment-success?session_id=${sessionId}`)
           .then(res=>{
            console.log(res.data)
           })
           .catch(error=>{
            console.log(error)
           })
         }
    }, [sessionId, axiosSecure])
    return (
        <div>
            <h2 className='text-3xl text-blue-400 font-bold text-center'>Payment Successfully</h2>
            
        </div>
    );
};

export default PaymentSucess;