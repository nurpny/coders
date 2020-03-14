import * as React from "react";
import * as ReactDom from "react-dom";
import {connect} from 'react-redux'
import history from '../history'
import {fetchingUser} from '../store/user'
import styled from 'styled-components';


const Wrapper = styled.section`
  font-family: 'IBM Plex Mono', monospace;
  font-size: 150%;
  color: #39e600;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  margin: 0px 50px;
  background-color: black;
`

const Button = styled.button`
  align-self: flex-end;
  width: auto;
  background-color: black;
  color: #39e600;
  font-size: 1em;
  margin: 1rem;
  border: 2px solid #39e600;
  border-radius: 3px;
	padding: 0.1rem .3rem;
`;



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
      <Wrapper>
        <div>"Hello World"</div>
        <div>Let's start connecting...</div>
        <Button onClick={this.handleClick}>Enter</Button>
      </Wrapper>
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
