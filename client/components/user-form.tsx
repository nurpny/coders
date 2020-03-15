import * as React from 'react'
import { connect } from 'react-redux'
import { signup } from '../store/user'
import { State } from '../types'
import styled from 'styled-components';

// Styles
const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  border-radius: 1em;
  margin: 2ex;
  max-width: 400px;
  padding: 1em;
  background-color: #d1d1d1;
  color: black;
`


// Types
type LocalState = {
  email: string
  password: string,
  interests:
    {'code review': boolean,
     'pair project': boolean}
  languages: object
}

type Props = {
  onSubmit: (arg0: LocalState) => void;
  error: any
}


// Component
class Signup extends React.Component<Props, LocalState> {

  constructor(props:Props) {
    super(props);
    this.state = {
      'email': "",
      'password': "",
      'interests': {
        'code review': false,
        'pair project': false,
      },
      'languages': {
        'vanilla JS': false,
        'expressJS': false,
        'typeScript': false,
        'python': false,
        'Java': false,
        'SQL': false,
        'PostgreSQL': false,
        'mongoDB': false,
      }
    }
    this.renderItems = this.renderItems.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt:React.SyntheticEvent<any>) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  renderItems(stateType:string) {
    const items = Object.keys(this.state[stateType])
    return items.map((item, idx) => {
      return (
        <label key = {idx}>
          <input type = "checkbox" name = {item}
          onChange = { (evt) => this.handleToggle(evt, stateType)}
          value={this.state.interests[item]} />
          {item}
        </label>
      )
    })
  }

  handleToggle(evt: React.SyntheticEvent<any>, stateType: string) {
    const val = evt.target.checked;
    const name = evt.target.name;
    let updatedList = {...this.state[stateType]}
    updatedList[name] = val
    this.setState({
      [stateType]: updatedList
    })
  }

  handleSubmit(evt: React.SyntheticEvent<any>) {
    evt.preventDefault()
    this.props.onSubmit(this.state);
  }

  render() {
    const { error } = this.props
    return (
        <FormWrapper onSubmit={this.handleSubmit} name={name}>
          <div>
            <label htmlFor="email"> Email </label>
            <input name="email" type="text" onChange={this.handleChange}/>
          </div>
          <div>
            <label htmlFor="password">Password </label>
            <input name="password" type="password" onChange={this.handleChange}/>
          </div>
          <div>
          <label> Interests (Choose all that apply)
            {this.renderItems("interests")}
          </label>
          </div>
          <div>
          <label> Languages (Choose all that apply)
            {this.renderItems("languages")}
          </label>
          </div>
          <div>
            <button type="submit">Sign Up</button>
          </div>
        </FormWrapper>

    )
  }
}

const mapState = (state : State) => {
  return {
    error: state.user.error
  }
}

const mapDispatch = (dispatch: React.Dispatch<any>) => {
  return {
    onSubmit(state:LocalState) {
      const {email, password, interests, languages} = state;
      let interestList = Object.entries(interests).filter(interestPair => interestPair[1]).map(interestPair => interestPair[0]);
      let languageList = Object.entries(languages).filter(languagePair => languagePair[1]).map(languagePair => languagePair[0]);
      dispatch(signup(email, password, interestList, languageList));
    }
  }
}

export default connect(mapState, mapDispatch)(Signup)

