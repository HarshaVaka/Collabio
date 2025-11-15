import { AddFriend } from "@/types/Friend.types";
import { API } from "./api";
import { PatchFormType } from "@/types/global.types";

export class FriendService {
    static getFriendsList = async () => {
        const response = await API.get("/friend/friendsList");
        return response.data;
    }

    static updateFriendRequestStatus = async (requestId:string,patchForm:PatchFormType) => {
        const response = await API.patch("/friend/updatefriendRequest/"+requestId, patchForm, {
            headers: {
                "Content-Type": "application/json-patch+json",
            }
        });
        return response.data;
    }

    static sendFriendRequest = async (payload: AddFriend) => {
        const response = await API.post("/friend", payload);
        return response.data;
    }

    static getPendingRequests = async () => {
        const response = await API.get("/friend/pendingfriendsList");
        return response.data;
    }
}