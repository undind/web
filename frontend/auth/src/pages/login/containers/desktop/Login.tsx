import { connect } from 'react-redux'
import { change, login } from '../../actions'
import Login from '../../components/desktop/Login'

export default connect(
  state => ({
    email: state.auth.login.email,
    password: state.auth.login.password,
    errors: state.auth.login.errors,
  }),
  dispatch => ({
    onChangeEmail: (value: string) => dispatch(change('email', value)),
    onChangePassword: (value: string) => dispatch(change('password', value)),
    onLogin: () => dispatch(login()),
  })
)(Login)
