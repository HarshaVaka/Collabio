export type RegisterPayload = {
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName:string
}


export type LoginPayload = {
    email:string,
    password:string
}