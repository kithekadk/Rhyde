export interface users{
    user_id: string,
    name: string,
    email: string,
    phone_number: string,
    role:string,
    Password: string,
    profile_image: string,
    location: string
}

export interface updatedUser{
    name:string, 
    email:string, 
    phone_number:string, 
    role:string, 
    password:string, 
    profile_image:string
}