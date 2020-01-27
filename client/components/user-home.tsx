import * as React from 'react'
import {connect} from 'react-redux'
import {logout} from '../store/user'

type Props = {
  user: User
  handleClick: () => void;
}

type User = {
  name: string
  email: string
  languages: Array<string>
  interests: Array<string>
}

const UserHome = ({user, handleClick}: Props) => {
  return (
    <div className="profile-container">
      <div className="profile-header">
      <h3> User Profile</h3>
      <button onClick={handleClick}>Log out</button>
      </div>
      <div className="inner-profile-container">
        <img
          id="profile-pic"
          src="https://i.insider.com/5ae75d4ebd967122008b4623"
          alt="profile-pic"
          height={400}
          width={400}
        />
        <div id="user-info">
          <div> name: {user.name} </div>
          <div> email: {user.email} </div>
          <div> languages: {user.languages &&
              user.languages.map(language => (
                <div key={language}>{language}</div>
              ))}
          </div>
          <div> interested in: {user.interests &&
              user.interests.map(interest => (
                <div key={interest}>{interest}</div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)
/**
 * PROP TYPES
 */
