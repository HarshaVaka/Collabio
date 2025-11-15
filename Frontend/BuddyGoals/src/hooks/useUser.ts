import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthService } from "../services/AuthService";
import { LoginPayload, RegisterPayload } from "../types/Auth.types";
import { useNavigate } from "react-router-dom";
import { UserDetail, UserProfile } from "@/types/User.types";
import { UserService } from "@/services/UserService";
import toast from "react-hot-toast";
import { PatchFormType } from "@/types/global.types";

export const useUser = () => {
    return useQuery<UserDetail>({
        queryKey: ["user"],
        queryFn: () => UserService.fetchUser(),
        staleTime: Infinity,
    });
}

export const useUserProfile =(username:string)=>{
    return useQuery<UserProfile>({
        queryKey: ["userProfile",username],
        queryFn: () => UserService.fetchUserProfile(username),
        enabled:!!username,
        staleTime: Infinity,
    })
}

export const useUpdateProfile =() =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(payload:PatchFormType) => UserService.updateUserProfile(payload),
        onSuccess: (res:string) => {
            queryClient.invalidateQueries({ queryKey: ["userProfile"] });
            toast.success(res);
        },
        onError:(error:Error)=>{
            toast.error(error.message)
        }
    })
}

export const useLogin = () => {
    const queryClient =  useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (payload: LoginPayload) => AuthService.loginUser(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
            navigate("/");
        },
    })
}

export const useRegister = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (payload: RegisterPayload) => AuthService.registerUser(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
            navigate("/");
        },
    });
};

export const useLogout = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => AuthService.logoutUser(),
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ["user"] });
        },
    })
} 