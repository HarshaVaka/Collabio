export type UserDetail={
    userName:string,
    email:string,
    profilePicUrl:string,
}

export type UserProfile ={
    userId:string,
    userName:string,
    email:string,
    profilePicUrl:string,
    firstName:string,
    lastName:string,
    bio:string,
    dob:Date,
    country:string,
    countryCode:string,
    phoneNo:string,
    gender:string,
    friendCount?:number,
    mutualCount?:number,
    status?: FriendshipStatusType,
    requestId?:string
}

export type SearchUserType ={
    userName:string,
    firstName:string,
    lastName:string,
    imageUrl?:string,
    mutualCount:number
}

export const FriendshipStatus = {
  NoFriends: 0,
  Pending: 1,
  AwaitingApproval: 2,
  AlreadyFriends: 3,
} as const;

export type FriendshipStatusType = typeof FriendshipStatus[keyof typeof FriendshipStatus];


