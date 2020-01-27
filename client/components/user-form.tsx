import * as React from 'react'
import { connect } from 'react-redux'
import { signup } from '../store/user'

/**
 * COMPONENT
 */
type LocalState = {
  email: string
  password: string,
  interests: Object
  languages: Object
}

type Props = {
  onSubmit: (arg0: LocalState) => void;
  error: any
}

class Signup extends React.Component<Props, LocalState> {

  constructor(props) {
    super(props);
    this.state = {
      'email': "",
      'password': "",
      'interests': {
        'code-review': false,
        'pair-project': false,
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

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  renderItems(stateType:string) {
    const items = Object.keys(this.state[stateType])
    return items.map((item, idx) => {
      return (
        <label key = {idx}>
          <input type = "checkbox" name = {item} onChange = { (evt) => this.handleToggle(evt, stateType)} value={this.state.interests[item]} />
          {item}
        </label>
      )
    })
  }

  handleToggle(evt, stateType) {
    const val = evt.target.checked;
    const name = evt.target.name;
    let updatedList = {...this.state[stateType]}
    updatedList[name] = val
    this.setState({
      [stateType]: updatedList
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    console.log("state>>>", this.state);
    this.props.onSubmit(this.state);
  }

  render() {
    const { error } = this.props
    return (
      <div id="user-form-container">
        <form id="signup" onSubmit={this.handleSubmit} name={name}>
          <div>
            <label htmlFor="email"> <small>Email</small> </label>
            <input name="email" type="text" onChange={this.handleChange}/>
          </div>
          <div>
            <label htmlFor="password"><small>Password</small> </label>
            <input name="password" type="password" onChange={this.handleChange}/>
          </div>
          <label> Interests (Choose all that apply)
            {this.renderItems("interests")}
          </label>
          <label> Languages (Choose all that apply)
            {this.renderItems("languages")}
          </label>
          <div>
            <button type="submit">Signup</button>
          </div>
          {/* {error && error.response && <div> {error.response.data} </div>} */}
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    onSubmit(state:LocalState) {
      const {email, password, interests, languages} = state;
      let interestList = Object.entries(interests).filter(interestPair => interestPair[1]).map(interestPair => interestPair[0]);
      let languageList = Object.entries(languages).filter(languagePair => languagePair[1]).map(languagePair => languagePair[0]);
      dispatch(signup(email, password, interestList, languageList));
    }
  }
}

export const SignupContainer = connect(mapState, mapDispatch)(Signup)

