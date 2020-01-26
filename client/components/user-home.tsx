import * as React from 'react'
import {connect} from 'react-redux'


type Props = {
  email: string;
};

const UserHome: React.FC<Props> = ({email}) => {

  return (
    <div>
      <h3>Welcome {email}</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)
/**
 * PROP TYPES
 */
