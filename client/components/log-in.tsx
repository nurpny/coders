import * as React from 'react'
import {connect} from 'react-redux'
import {auth} from '../store/user'
import history from '../history'

/**
 * COMPONENT
 */
type Props = {
  handleSubmit: () => void;
  error: any
}

class Login extends React.Component <Props, any> {

  constructor() {
    super()
    this.handleSignin = this.handleSignin.bind(this)
  }

  handleSignin() {
    history.push('/signup')
  }

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

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
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

export default connect(mapLogin, mapDispatch)(Login)
// export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
