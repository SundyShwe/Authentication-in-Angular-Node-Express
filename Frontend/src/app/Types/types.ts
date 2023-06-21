export interface IUser{
    fullname : string,
    email : string,
    password : string,
}

export interface IState{
    _id : string,
    fullname : string,
    email : string,
    jwt : string
}

export const Initial_State = {
    _id : '',
    fullname : '',
    email : '',
    jwt : ''
}