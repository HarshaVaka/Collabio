import { FriendService } from "@/services/FriendService";
import { AddFriend } from "@/types/Friend.types";
import { PatchFormType } from "@/types/global.types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAddFriendQuery = () => {
    const queryClient =  useQueryClient();
    return useMutation({
        mutationFn: (payload:AddFriend) => FriendService.sendFriendRequest(payload),
        onSuccess: (data,variables) => {
            queryClient.invalidateQueries({ queryKey: ["userProfile",variables.receiverUserName] });
        },
    })
}

export const useUpdateFriendQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { requestId:string,userName: string; payload: PatchFormType }) =>
      FriendService.updateFriendRequestStatus(variables.requestId,variables.payload),
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["userProfile", variables.userName],
      });
      toast.success(res);
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
