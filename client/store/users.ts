import axios from 'axios'
import history from '../history'
import { User } from '../types'


/**
 * ACTION TYPES
 */
const GET_USERSLIST = 'GET_USERS_LIST'


/**
 * INITIAL STATE
 */
const defaultUsersList = []


/**
 * USER ACTION TYPES
 */
interface GetUsersListAction {
  type: String,
  users: Array<User>
}

type UsersListActionType = GetUsersListAction


/**
 * ACTION CREATORS
 */
const getUsersList: (users: Array<User>) => UsersListActionType =
  users => ({ type: GET_USERSLIST, users })


/**
 * THUNK CREATORS
 */
export const fetchingUsersList = (tag: String) => async dispatch => {
  try {
    const res = await axios.get('/api/users/' + tag)
    dispatch(getUsersList(res.data || defaultUsersList))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultUsersList, action: UsersListActionType): Object {
  switch (action.type) {
    case GET_USERSLIST:
      return action.users
    default:
      return state
  }
}
