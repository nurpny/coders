import * as React from 'react'
import { connect } from 'react-redux'
import { User, State } from '../types'
import UsersList from './users-list'



class FilterableUsersList extends React.Component<any, any> {

  constructor(props) {
    super(props)
    this.state = {
      filter: false,
      selectedInterest: ''
    }
  }

  render() {
    return (
      <div>

      <UsersList/>
      </div>
    )
  }
}

const mapState = (state: State) => {
  return {
    users: state.users
  }
}


export default connect(mapState) (FilterableUsersList)

