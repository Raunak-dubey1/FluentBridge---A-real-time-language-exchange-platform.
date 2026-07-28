import { User } from "../models/User.js";
import { FriendRequest } from "../models/FriendRequest.js";

export async function getRecommendedUsers(req,res){
  try{
    const currentUserId=req.user._id;
    const currentUser=req.user

    const recommendedUsers=await User.find({
        $ans:[
            {_id:{$ne:currentUserId}},
            {_id:{$nin:currentUser.friends}},
            {isOnboarded:true}
        ]
    });
    res.status(200).json(recommendedUsers)
  }catch(error){
    console.log("Error in handling recommendedUser Controller",error.message);
    res.status(500).json({message:"Internal Server Error"})
  }
};

export async function getMyFriends(req,res){
   try{
    const user = await User.findById(req.user._id)
    .select("friends")
    .populate("friends","fullName profilePic nativeLanguage learnigLanguage");

    res.status(200).json(user.friends);
   }catch(error){
        console.log("Error in handling getFriend controller",error.meassage);
        res.status(500).json({message:"Internal Server Error"});
   }
}

export async function sendFriendRequest(req,res){
    try{
        const myId=req.user._id;
        const {id: recipientId}=req.params;

        if(myId===recipientId){
            res.status(400).json({message:"You can sent friend req to Yourself"})
        }

        const recipient=await User.findById(recipientId)
        if(!recipient){
            return res.status(404).json({message:"Recipient not Found"});
        }

        if(recipient.friends.includes(myId)){
            return res.status(400).json({message:"You both are already friends"});
        }

        const existingRequest=await FriendRequest.findOne({
            $or:[
                {sender:myId,recipient:recipientId},
                {sender:recipientId,recipient:myId}
            ]
        })

        if(existingRequest){
           return res.status(400).json({message:"Request already done between you and the user"});
        }

        const friendRequest=await FriendRequest.create({
            sender:myId,
            recipient:recipientId
        })

        res.status(201).json(friendRequest);
    }catch{
        console.log("Error in Sending friendReq",error.message);
        res.status(500).json({message:"Internal Servor Error while sending Friend Request"})
    }
}

export async function acceptFriendRequest(req,res){
   try{
     const {id:requestId}=req.params;

     const friendRequest=await FriendRequest.findById(requestId);

     if(!friendRequest){
        return res.status(400).json({message:"No friend req found"})
     }

    //verifying is the current user is recipient or not 
     if(friendRequest.recipient.toString()!==req.user._id){
        return res.status(401).json({message:"you are not authorized to accept the req"})
     }

     friendRequest.status="accepted";
     await friendRequest.save()

    //Updating the friend list for both the User 
     await User.findByIdAndUpdate(friendRequest.sender,{
        $addToSet:{friends:friendRequest.recipient}
     })

     await User.findByIdAndUpdate(friendRequest.recipient,{
        $addToSet:{friends:friendRequest.sender}
     })

     res.status(200).json({message:"Friend requese accepted succcessfully"});

   }catch(error){
    console.log("Error while accepting friend request",error.message);
    res.status(500).json({message:"Internal Server Error while accepting req"});
   }
}

export async function getFriendRequest(req,res){
    try{
        const incomingReqs=await FriendRequest.find({
            recipient:req.user.id,
            status:"pending"
        }).populate("sender","fullName profilePic nativeLanguage learningLanguage")

        //the req that we have sended and get accepted
        const acceptedReqs=await FriendRequest.find({
            sender:req.user.id,
            status:"accepted"
        }).populate("recipient","fullName profilePic");     

        res.status(200).json({incomingReqs,acceptedReqs})
    }catch(error){
        console.log("Error while fetching friend req notification",error.message);
        res.status(500).json({message:"Internal Server Error while request notification"})
    }
}

export async function getOutgoingFriendReqs(req,res){
    try{
        const outgoingRequests=FriendRequest.find({
            sender:req.user.id,
            status:"pending"
        }).populate("recipient","fullName profilePic nativeLanguage learningLanguage")

        res.status(200).json({outgoingRequests})
    }catch(error){
        console.log("Error while getOutgoingreqs",error.message);
        res.status(500).json({message:"Internal Server Error while getOutgoing"})
    }
}