import { getAuthUser } from "../lib/api.js"
import {useQuery} from "@tanstack/react-query"

const useAuthUser=()=>{
  const authUser=useQuery({
    queryKey:["authUser"],
    queryFn:getAuthUser,
    return: false,
  });

  return {isLoading:authUser.isLoading,authUser:authUser.data?.user};
}

export default authUser