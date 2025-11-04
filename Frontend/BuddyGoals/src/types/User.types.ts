export type UserDetail={
    userName:string,
    email:string,
    profilePicUrl:string,
}

export type UserProfile ={
    userName:string,
    email:string,
    profilePicUrl:string,
    firstName:string,
    lastName:string,
    bio:string,
    dOB:Date,
    country:string,
    phoneNo:string,
    gender:string
}

export type JsonPatchOperation = {
  op: "add" | "remove" | "replace" | "move" | "copy" | "test";
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
};

export type PatchFormType = JsonPatchOperation[];
