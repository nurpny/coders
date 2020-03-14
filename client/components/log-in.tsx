import * as React from 'react'
import {connect} from 'react-redux'
import {auth} from '../store/user'
import history from '../history'
import styled from 'styled-components'


const Container = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0px 50px;
  color: #f7f779;
  font-family: 'IBM Plex Mono', monospace;
`

const LoginForm = styled.form`
  max-width: 500px;
`


type Props = {
  handleSubmit: () => void;
  error: any
}

class Login extends React.Component <Props, any> {

  constructor(props:Props) {
    super(props)
    this.handleSignin = this.handleSignin.bind(this)
  }

  handleSignin() {
    history.push('/signup')
  }

  render () {
    const {handleSubmit, error} = this.props
    return (
    <Container>
      <LoginForm onSubmit={handleSubmit} name={name}>
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
      </LoginForm>
      <form onSubmit={this.handleSignin}>
        <div><small>Click here to sign up instead</small> </div>
        <button type="submit">Sign up</button>
      </form>

      </Container>
    )
  }
}


const mapLogin = state => {
  return {
    error: state.user.error
  }
}

const mapDispatch = (dispatch : React.Dispatch<any>) => {
  return {
    handleSubmit(evt:React.SyntheticEvent) {
      evt.preventDefault()
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password))
    }
  }
}

export default connect(mapLogin, mapDispatch)(Login)

