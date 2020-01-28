import * as React from 'react'
import { connect } from 'react-redux'
import { User } from '../types'
import { fetchingUsersList } from '../store/users'


type Props = {
  users: Array<User>
  onLoadUsersList: (tag: string) => void;
  language: string
  match: any
}

class UsersList extends React.Component<Props, any> {

  componentDidMount() {
    this.props.onLoadUsersList(this.props.match.params.id)
  }

  render() {
    return (
      <div className="users-container">
        {this.props.users && this.props.users.map(user =>
          <div key={user._id} className='user-container'>
            <img
              id="user-pic"
              src="https://i.insider.com/5ae75d4ebd967122008b4623"
              alt="profile-pic"
              height={100}
              width={100}
            />
            <div className="user-info">
              <div>email:{user.email}</div>
              <div>interests: {user.interests && user.interests.map((interest, idx) => <span key={idx}>{interest}</span>)}</div>
              <div>languages: {user.languages && user.languages.map((language, idx) => <span key={idx}>{language}</span>)}</div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    users: state.users
  }
}

const mapDispatch = dispatch => {
  return {
    onLoadUsersList: (tag: String) => { dispatch(fetchingUsersList(tag)) }
  }
}


export default connect(mapState, mapDispatch)(UsersList)
