import * as React from 'react'
import { connect } from 'react-redux'
import { User, State } from '../types'
import UsersList from './user'
import styled from 'styled-components'
import { fetchingUsersList } from '../store/users'
import Select from 'react-select'


// Styles
const Container = styled.section`
  display:flex;
  flex-direction: column;
  padding: 2em;
  align-content: flex-end;
`

const customStyles = {
  container: (base) => ({
    ...base,
    alignSelf: 'flex-end',
    width: 300,
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted #b8b8b8',
    padding: 2,
    width: 300,
    background: state.isSelected ? '#b8b8b8' : 'white',
    color: 'black'
  }),
  menu: (provided, state) => ({
    ...provided,
    border: '2px solid white',
  })
}

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
      selectedInterest: {value:null, label:'Filter by Interests'},
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.onLoadUsersList(this.props.match.params.id)
  }

  handleChange(selectedInterest) {
    this.setState({ selectedInterest })
  }

  render() {
    let interests = this.props.users.reduce(
      (acc: Array<string>, user: User) => acc.concat(user.interests), []).filter(
        (interest: string, idx: number, arr: Array<string>) =>
          arr.indexOf(interest) === idx).map(
            (interest: string) => { return { value: interest, label: interest } }
          )
    interests = [...interests, {value:null, label: 'All'}]
    console.log('interests', interests)

    const { selectedInterest } = this.state
    console.log("selectedInterest", selectedInterest);

    return (
      <Container>
        <Select
          styles={customStyles}
          width='200px'
          menuColor='red'
          value={selectedInterest}
          onChange={this.handleChange}
          options={interests}
          placeholder = {"Filter By Interests"}
        />
        {!this.state.selectedInterest.value ?
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
      </Container>
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

