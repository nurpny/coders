import * as React from 'react'
import { connect } from 'react-redux'
import { User, State } from '../types'

const url = (process.env.NODE_ENV ==='production' ? 'HEROKUAPPPAGE' : 'http://localhost:8080/images/')


// types
type Props = {
  user: User
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


  render() {
    let { pic, email, interests, languages} = this.props.user
    return (
          <div className='user-container'>
            <img
              id="user-pic"
              src={pic}
              alt="profile-pic"
              height={100}
              width={100}
            />
            <div className="user-info">
              <div>email:{email}
              <span><img id="email-img" src={url+"email-icon-bl.png"} height={20} width={20} onClick={this.showEmail}/></span>
              </div>
              <div> interests: {interests.join(", ")}</div>
              <div>languages: {languages.join(",")}</div>
            </div>
          </div>
    )
  }
}

const mapState = (state : State) => {
  return {
    users: state.users
  }
}




export default connect(mapState)(UsersList)
