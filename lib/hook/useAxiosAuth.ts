"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { aixosAuth } from "../axios";
import { useRefreshToken } from "./useRefreshToken";
 

const useAxoisAuth =()=>{
    const {data:session}= useSession();
    const refreshToken = useRefreshToken();

useEffect(()=>{

    const requestIntercept =aixosAuth.interceptors.request.use((config)=>{

        if(!config.headers["Authorization"]){
            config.headers["Authorization"] = `Bearer ${session?.user.accessToken}`
        }

    return config;

    },
      (error)=> Promise.reject(error)
     );

    const responseIntercept =aixosAuth.interceptors.response.use(
        (response)=>response,
        async(error)=>{
            const prevRequest = error.config;
            if(error.response.status === 401 && !prevRequest.sent){
                prevRequest.sent = true;
                await refreshToken();
                prevRequest.headers["Authorization"]=`Brearer ${session?.user.accessToken}`;
                return aixosAuth(prevRequest);
            }

            return Promise.reject(error);
        }
    )

    return ()=>{
        aixosAuth.interceptors.request.eject(requestIntercept);
        aixosAuth.interceptors.request.eject(responseIntercept)
    };
},[session]);

return aixosAuth;

};

export default useAxoisAuth;