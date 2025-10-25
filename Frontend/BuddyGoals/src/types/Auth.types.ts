export type RegisterPayload = {
    username: string,
    password: string,
    email: string,
    fullName: string
}


export type LoginPayload = {
    email:string,
    password:string
}