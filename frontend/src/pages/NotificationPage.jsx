import {useQueryClient} from "@tanstack/react-query";
import { getFriendRequest } from "../../../backend/src/controllers/user.controller";
const NotificationPage=()=>{

    const queryClient=useQueryClient();
    const {data:friendRequests,isPending}=useQuery({
        queryKey:["friendRequests"],
        queryFn: getFriendRequests
    })

};

export default NotificationPage;