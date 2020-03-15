import axios from 'axios'
import history from '../history'
import { User, UserError } from '../types'
import { Dispatch } from "react";

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'


/**
 * INITIAL STATE
 */
const defaultUser = {}


/**
 * USER ACTION TYPES
 */
interface GetUserAction {
  type: String,
  user: User
}

interface RemoveUserAction {
  type: String,
}

type UserActionType = GetUserAction | RemoveUserAction


/**
 * ACTION CREATORS
 */
const getUser: (user: User) => UserActionType =
  user => ({ type: GET_USER, user })

const removeUser: () => UserActionType =
  () => ({ type: REMOVE_USER })


/**
 * THUNK CREATORS
 */
export const fetchingUser = () => async (dispatch:Dispatch<any>) => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email:string, password:string) => async (dispatch:Dispatch<any>)  => {
  let res;
  try {
    res = await axios.post(`/auth/login`, { email, password })
  } catch (authError) {
    return dispatch(getUser({ error: authError }))
  }
  try {
    dispatch(getUser(res.data))
    history.push('/userhome')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const signup = (email: string, password: string, interests: Array<string>, languages: Array<string>) => async (dispatch:Dispatch<any>)  => {
  let res;
  try {
    res = await axios.post(`/auth/signup`, { email, password, interests, languages})
  } catch (authError) {
    return dispatch(getUser({ error: authError }))
  }
  try {
    dispatch(getUser(res.data))
    history.push('/userhome')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}


export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultUser, action: UserActionType): Object {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
