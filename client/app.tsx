import * as React from 'react'
import Routes from './routes'
import {connect} from 'react-redux'


export default class App extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Routes/>
      </div>
    )
  }
}

