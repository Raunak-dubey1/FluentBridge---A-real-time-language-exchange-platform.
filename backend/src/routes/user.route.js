import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { 
    getRecommendedUsers,
    getMyFriends,
    sendFriendRequest,
    acceptFriendRequest,
    getFriendRequest,
    getOutgoingFriendReqs
} from "../controllers/user.controller.js";

const router =express.Router();

router.use(protectRoute);// to apply the auth middleware to every route here

router.get("/",getRecommendedUsers);
router.get("/friends",getMyFriends);

router.post("/friend-request/:id",sendFriendRequest);
router.put("/friend-request/:id/accept",acceptFriendRequest);

// for the notification purpose from where user will accept req
router.get("/friend-requests",getFriendRequest)
router.get("/friend-requests",getOutgoingFriendReqs)

export default router;