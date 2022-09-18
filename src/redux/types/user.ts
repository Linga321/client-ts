export type UserRole = 'Customer' | 'Admin' | 'SuperAdmin'

export interface User{
    _id: string,
    firstName: string
    lastName: string
    email: string
    password: string
    role?: UserRole
    avatar?: string
    phone?: string
    address?: 
      {
        userAddress: string
        place: string
      }[]
}

export interface UserToken{
    token: string
}

export interface UserLogin{
    email: string,
    password: string,
}

export interface UserRegister{
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    avatar?: string,
}

export interface UserData {
    userList: User[]
    userAuth: User | undefined
    userLogin: UserLogin | undefined
    userToken : UserToken | undefined
}