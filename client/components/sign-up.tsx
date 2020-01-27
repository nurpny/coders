import * as React from 'react'
import {connect} from 'react-redux'
import {auth} from '../store/user'

/**
 * COMPONENT
 */
type Props = {
  handleSubmit: () => void;
  error: any
}

class Signup extends React.Component <Props, any> {

  render () {
    const {handleSubmit, error} = this.props
    return (
      <div id="login-container">
      <form id="login" onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email"> <small>Email</small> </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password"><small>Password</small> </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <form onSubmit={this.handleSignin}>
        <div><small>Click here to sign up instead</small> </div>
        <button type="submit">Sign up</button>
      </form>
      </div>
    )
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password))
    }
  }
}

export default connect(,)(Signup)

