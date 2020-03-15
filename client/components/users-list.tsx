import * as React from 'react'
import { connect } from 'react-redux'
import { User, State } from '../types'
import { fetchingUsersList } from '../store/users'

const url = (process.env.NODE_ENV ==='production' ? 'HEROKUAPPPAGE' : 'http://localhost:8080/images/')


// types
type Props = {
  users: Array<User>,
  onLoadUsersList: (tag: string) => void;
  // language: string
  // match: any
}

type LocalState = {
  showEmail: boolean
}

// component
class UsersList extends React.Component<Props, LocalState> {

  constructor(props:Props) {
    super(props)
    this.state = {
      showEmail: false
    }
    this.showEmail = this.showEmail.bind(this)
  }

  showEmail() {
    this.setState({showEmail: true})
  }
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
              src={user.pic}
              alt="profile-pic"
              height={100}
              width={100}
            />
            <div className="user-info">
              <div>email:{user.email}
              <span><img id="email-img" src={url+"email-icon-bl.png"} height={20} width={20} onClick={this.showEmail}/></span>
              </div>
              <div> interests: {user.interests && user.interests.join(", ")}</div>
              <div>languages: {user.languages && user.languages.join(",")}</div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapState = (state : State) => {
  return {
    users: state.users
  }
}

const mapDispatch = (dispatch : React.Dispatch<any>) => {
  return {
    onLoadUsersList: (tag: String) => { dispatch(fetchingUsersList(tag)) }
  }
}


export default connect(mapState, mapDispatch)(UsersList)
