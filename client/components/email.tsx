import * as React from 'react'
import { connect } from 'react-redux'
import { User } from '../types'

type State = {
  subject: String
  message: String
}

type Props = {
  user: User,
  recipient: User
}

class Email extends React.Component<any, State>{
    constructor(props) {
      super(props)
      this.handleChange = this.handleChange.bind(this)
    }

    handleChange(evt) {
      this.setState({[evt.target.name]: evt.target.value})
    }

    handleSubmit(evt) {
      evt.preventDefault()
      this.props.onSubmit(this.state, this.props.user.email, this.props.recipient.email);
    }
    render() {
      return (
        <form id='email' onSubmit={this.handleSubmit}>
          <input name="subject" ><label>Subject: </label></input>
          <input name="message"><label>Message: </label></input>
          <button type='submit'>Send</button>
        </form>
      )
    }
}


const mapState = (state, ownProps) => {
  return {
    user: state.user,
    recipient: ownProps.recipient
  }
}

const mapDispatch = dispatch =>{
  return {
    onSubmit: ({subject: String, message: String}, userEmail: string, recipientEmail: string): any => {
      console.log(subject, message, userEmail, recipientEmail)
      //dispatch(sendEmail(subject, message, userEmail, recipientEmail))
    }
  }
}
export default connect(mapState, mapDispatch)(Email)

