import { axiosInstance } from "./axios.js";

export const signup=async (signupData)=>{
    const response=await axiosInstance.post("/auth/signup",signupData);
     return response.data;
}

export const getAuthUser=()=>{
    const res=await axiosInstance.get("/api/me");
    return res.data;
}

export const getFriendRequest=()=>{
    const res=await axiosInstance.get("/users/firend-requests")
    return res.data
}