import axios from "axios";
import React, { useEffect } from "react";
import UseAuth from "./UseAuth";
import { useNavigate } from "react-router";
let axiosSecure = axios.create({
  baseURL: "https://assetflow-backend-tau.vercel.app",


});
const UseAxios = () => {
  let { user, logOutUser } = UseAuth();
  console.log("user ashe" , user)
  let navigate = useNavigate()

  useEffect(() => {
    // intercep
   let reqInterceptor =  axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user.accessToken} `;
      return config;
    });React
        let resInterceptor = axiosSecure.interceptors.response.use((response)=>{
          return response
        }, (error)=>{
          console.log(error)

          let statusCode = error.status 
          if(statusCode === 401 || statusCode === 403 ){
            
              logOutUser()
              .then(res=>{
                   console.log(res)
                   console.log("undefined ascheeeeee")
                   navigate("register/login")
              })
              .catch(er=>{
                console.log(er)
              })
          }
          return Promise.reject(error)
        })

    return ()=>{
      axiosSecure.interceptors.request.eject(reqInterceptor)
      axiosSecure.interceptors.response.eject(resInterceptor)

    }
  }, [user,logOutUser, navigate ]);

  return axiosSecure;
};

export default UseAxios;
