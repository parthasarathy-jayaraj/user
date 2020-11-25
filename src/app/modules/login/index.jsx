import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import {connect} from 'react-redux';
import loginActions from './actions';

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * updates the local state with the changed input value
   * @param {Event} event
   */
  handleChange(e) {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  /**
   * dispathes the register action to the reducer
   * @param {Event} e
   * props.login - refer connect method below.
   */
  handleSubmit(e) {
    e.preventDefault();

    this.setState({submitted: true});
    const {userName, password} = this.state;
    if (userName && password) {
      this.props.login(userName, password);
    }
  }

  render() {
    const containerStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 30,
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      background: '#fff',
      borderRadius: 4,
    };
    const registerLink = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    };

    const {userName, password, submitted} = this.state;
    return (
      <Container component='main' maxWidth='xs' style={containerStyle}>
        <CssBaseline />
        <div>
          <Avatar style={{margin: '0 auto'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5' style={{textAlign: 'center'}}>
            Sign in
          </Typography>
          <form style={{textAlign: 'center'}}>
            <TextField
              variant='outlined'
              margin='normal'
              value={userName}
              onChange={this.handleChange}
              required
              fullWidth
              id='userName'
              label='User name'
              name='userName'
            />
            <TextField
              variant='outlined'
              margin='normal'
              value={password}
              onChange={this.handleChange}
              required
              fullWidth
              id='password'
              label='Password'
              type='password'
              name='password'
            />
            <Button type='submit' size='large' variant='contained' color='primary' onClick={this.handleSubmit}>
              Sign In
            </Button>

            <div style={registerLink}>
              <Typography>New User ?</Typography>
              <Link href='/register'>Register</Link>
            </div>
          </form>
        </div>
      </Container>
    );
  }
}

/**
 * Bind the state object from store to props of the component
 * @param {objects} state
 */
const mapStateToProps = (state) => {
  return state.login;
};

/**
 * Dispatches the actions
 * @param {objects} state
 */
const mapDispactchToProps = (dispatch) => {
  return {
    login: (userName, password) => dispatch(loginActions.login(userName, password)),
  };
};

const LoginPage = connect(mapStateToProps, mapDispactchToProps)(LoginComponent);

export default LoginPage;
