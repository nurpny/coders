import * as React from "react";
import * as ReactDom from "react-dom";
import {connect} from 'react-redux'

class Welcome extends React.Component<any, any> {

  render() {
    return (
      <div id="welcome">
        <div>"Hello World"</div>
        <div>Let's start connecting...</div>
        <button id="welcome-enter">Enter</button>
      </div>


    )
  }
}

export default connect()(Welcome)
