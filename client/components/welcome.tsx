import * as React from "react";
import * as ReactDom from "react-dom";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import history from '../history'
import {fetchingUser} from '../store/user'


class Welcome extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.loadInitialData()
  }

  handleClick() {
    if(!!this.props.user._id) {history.push('/userhome')}
    else {history.push('/login')}
  }

  render() {
    return (
      <div id="welcome">
        <div>"Hello World"</div>
        <div>Let's start connecting...</div>
        <button id="welcome-enter" onClick={this.handleClick}>Enter</button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData: () => {
      dispatch(fetchingUser())
    }
  }
}

export default (connect(mapState, mapDispatch)(Welcome))
