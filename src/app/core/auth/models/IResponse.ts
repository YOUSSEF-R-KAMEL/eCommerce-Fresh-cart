export interface IResponse  {
  message: string,
  statusMsg: string
  token: string,
  user:IUser
}

export interface IUser {
  email: string
  name: string
  role: string
}
