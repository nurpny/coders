import * as React from "react";
import * as ReactDom from "react-dom";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import history from '../history'

export default class Welcome extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    if(!!this.props.userId) {history.push('/user-home')}
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

