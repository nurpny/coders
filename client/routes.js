import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {Login, Signup, UserHome, Welcome, FilteredUsersList} from './components'

/**
 * COMPONENT
 */
class Routes extends Component {
  // componentDidMount() {
  //   this.props.loadInitialData()
  // }
  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/userhome" component={UserHome} />
        <Route path="/users/:id" component={FilteredUsersList} />
        <Route path="/" component={Welcome} userId = {this.props.userId}/>
      </Switch>
    )
  }
}


// const mapState = state => {
//   return {
//     userId: state.user._id
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     loadInitialData: () => {
//       dispatch(fetchingUser())
//     }
//   }
// }

/**
 * CONTAINER
 */

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(Routes)

