import {StreamChat} from "stream-chat"
import dotenv from "dotenv"

dotenv.config();

const apikey=process.env.STREAM_API_KEY
const apiSecret=process.env.STREAM_API_SECRET

if(!apiSecret||!apikey)
    console.error("Stream apikey or secret missing");

const streamClient= StreamChat.getInstance(apikey,apiSecret);

export const upsertStreamUser=async(userData)=>{
  try{
     await streamClient.upsertUsers([userData]);
     return userData;
  }catch(error){
    console.error("Error upserting stream user ")
  }
};

export const genrateStreamToken=async(userId)=>{
    try{
      const userIdStr=userId.toString();
      return streamClient.createToken(userIdStr);
    }catch(error){
      console.log("Error in generatStreaToken")
    }
}