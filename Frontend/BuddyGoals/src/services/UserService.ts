import { PatchFormType } from "@/types/global.types";
import { API } from "./api";

export class UserService {
    static fetchUser = async () => {
        const response = await API.get("/user/me");
        return response.data;
    };

    static fetchUserProfile = async (userName:string) => {
        const response = await API.get("/user/profile/"+userName);
        return response.data;
    }

    static updateUserProfile = async (patchForm: PatchFormType) => {
        const response = await API.patch("/user/profile", patchForm, {
            headers: {
                "Content-Type": "application/json-patch+json",
            }
        });
        return response.data;
    }

    static fetchUsersBySearch = async (searchTerm: string) => {
        const response = await API.get("/user/usersListBySearchTerm?searchTerm=" + searchTerm);
        return response.data;
    }
}
