export interface User {
  _id: string,
  email: string,
  languages: Array<String>,
  interests: Array<String>,
  __v: number,
  error?: Error
}


export interface State {
  user: User,
  users: Array<User>
}
