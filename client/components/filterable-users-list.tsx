import * as React from 'react'
import { connect } from 'react-redux'
import { User, State } from '../types'
import UsersList from './user'
import styled from 'styled-components'
import { fetchingUsersList } from '../store/users'
import Select from 'react-select'

// Styles


// types
type Option = {
  value: 'string',
  label: 'string'
}
type LocalState = {
  filter: boolean
  selectedInterest: Option
}

class FilterableUsersList extends React.Component<any, LocalState> {

  constructor(props) {
    super(props)
    this.state = {
      selectedInterest: null,
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.onLoadUsersList(this.props.match.params.id)
  }

  handleChange(selectedInterest) {
    this.setState({ selectedInterest })
    console.log("Option selected", this.state.selectedInterest)
  }

  render() {
    const interests = this.props.users.reduce(
      (acc: Array<string>, user: User) => acc.concat(user.interests), []).filter(
        (interest: string, idx: number, arr: Array<string>) =>
          arr.indexOf(interest) === idx).map(
            (interest: string) => { return { value: interest, label: interest } }
          )
    console.log("interests", interests);
    const { selectedInterest } = this.state

    return (
      <div>
        <Select
          value={selectedInterest}
          onChange={this.handleChange}
          options={interests}
        />
        {this.state.selectedInterest === null ?
          this.props.users &&
          this.props.users.map((user: User) =>
            <div key={user._id}>
              <UsersList user={user} />
            </div>)
          : this.props.users.filter(
            (user: User) => user.interests.includes(this.state.selectedInterest.value)).map(
              (user: User) =>
                <div key={user._id}>
                  <UsersList user={user} />
                </div>
            )
        }
      </div>
    )
  }
}

const mapState = (state: State) => {
  return {
    users: state.users
  }
}

const mapDispatch = (dispatch: React.Dispatch<any>) => {
  return {
    onLoadUsersList: (tag: String) => { dispatch(fetchingUsersList(tag)) }
  }
}


export default connect(mapState, mapDispatch)(FilterableUsersList)

