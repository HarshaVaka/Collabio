import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthService } from "../services/AuthService";
import { LoginPayload, RegisterPayload } from "../types/Auth.types";
import { useNavigate } from "react-router-dom";
import { PatchFormType, UserDetail, UserProfile } from "@/types/User.types";
import { UserService } from "@/services/UserService";
import toast from "react-hot-toast";

export const useUser = () => {
    return useQuery<UserDetail>({
        queryKey: ["user"],
        queryFn: () => UserService.fetchUser(),
        staleTime: Infinity,
    });
}

export const useUserProfile =()=>{
    return useQuery<UserProfile>({
         queryKey: ["userProfile"],
        queryFn: () => UserService.fetchUserProfile(),
        staleTime: Infinity,
    })
}

export const useUpdateProfile =() =>{
    const queryClient = new QueryClient();
    return useMutation({
        mutationFn:(payload:PatchFormType) => UserService.updateUserProfile(payload),
        onSuccess: (res:string) => {
            queryClient.invalidateQueries({ queryKey: ["userProfile"] });
            toast.success(res);
        },
    })
}

export const useLogin = () => {
    const queryClient = new QueryClient();
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
    const queryClient = new QueryClient();
    return useMutation({
        mutationFn: () => AuthService.logoutUser(),
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ["user"] });
        },
    })
} 