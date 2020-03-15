import * as React from 'react'
import {connect} from 'react-redux'
import {logout} from '../store/user'
import {Link} from 'react-router-dom'
import { User, State }  from '../types'
import styled from 'styled-components'

// types
type Props = {
  user: User
  handleClick: () => void;
}



// styles
const Container = styled.section`
  border: 1px solid white;
  margin: 2em;
  padding: 2em;
  border-radius: 1em;
`
const Header = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const InnerContainer = styled.section`
   display: flex;
   flex-direction: row;
`


// component
const UserHome = ({user, handleClick}: Props) => {
  return (
    <Container>
      <Header>
      <h3> User Profile</h3>
      <button onClick={handleClick}>Log out</button>
      </Header>
      <InnerContainer>
        <img
          id="profile-pic"
          src={user.pic}
          alt="profile-pic"
          height={400}
          width={400}
        />
        <div id="profile">
          <div> email: {user.email} </div>
          <div> <label>languages:</label> {user.languages &&
              user.languages.map(language => (
                <div key={language}><Link to={'/users/'+language}>-{language}</Link></div>
              ))}
          </div>
          <div> interested in: {user.interests &&
              user.interests.map(interest => (
                <div key={interest}>-{interest}</div>
              ))}
          </div>
        </div>
      </InnerContainer>
    </Container>
  )
}

/**
 * CONTAINER
 */
const mapState = (state: State) => {
  return {
    user: state.user
  }
}

const mapDispatch = (dispatch: React.Dispatch<any>) => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)
