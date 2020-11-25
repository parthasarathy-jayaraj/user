import React, {Component} from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

import {connect} from 'react-redux';
import RegisterActions from './actions';

import './register.scss';

class RegisterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        userName: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        gender: 'male',
        country: {
          id: 3,
          name: 'Hongkong',
        },
      },
      error: null,
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeCountry = this.changeCountry.bind(this);
    this.closeErrorMessage = this.closeErrorMessage.bind(this);
  }

  /**
   * called for all input changes except country
   * updates the local state with the changed input value
   * @param {Event} event
   */
  handleChange(event) {
    const {name, value} = event.target;
    const {user} = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  }

  /**
   * called for all country input field
   * updates the country of local state with the changed input value
   * @param {Event} event
   */
  changeCountry(event) {
    let user = {...this.state.user};
    user.country = event.target.value;
    this.setState({user});
  }

  /**
   * dispathes the register action to the reducer
   * @param {Event} event
   * props.register - connect method below has it.
   */
  handleSubmit(event) {
    event.preventDefault();

    this.setState({submitted: true});
    const {user} = this.state;
    if (user.firstName && user.userName && user.password && user.email) {
      this.props.register(user);
    } else {
      this.setState({
        error: 'Please fill the mandatory fields denoted by *',
      });
    }
  }

  /**
   * updates the state to close the required field error message in register form
   */
  closeErrorMessage() {
    this.setState({
      error: null,
    });
  }

  componentDidMount() {
    this.props.getCountries();
  }

  render() {
    const {countries} = this.props;
    const {user} = this.state;

    const classes = {
      paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      },
      avatar: {
        backgroundColor: 'blue',
      },
      form: {
        width: '100%',
        textAlign: 'center',
      },
      submit: {},
    };
    const containerStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 30,
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      background: '#fff',
      borderRadius: 4,
    };

    return (
      <Container style={containerStyle} component='main' maxWidth='sm'>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component='h1' variant='h5' style={{textAlign: 'center'}}>
            Register
          </Typography>
          <form className={classes.form}>
            <TextField variant='outlined' value={user.userName} onChange={this.handleChange} required={true} id='userName' label='User name' name='userName' />
            <TextField
              variant='outlined'
              value={user.password}
              onChange={this.handleChange}
              required={true}
              id='password'
              type='password'
              label='Password'
              name='password'
            />
            <TextField
              variant='outlined'
              value={user.firstName}
              onChange={this.handleChange}
              required={true}
              id='firstMame'
              label='First name'
              name='firstName'
            />
            <TextField variant='outlined' value={user.lastName} onChange={this.handleChange} id='lastMame' label='Last name' name='lastName' />
            <TextField
              variant='outlined'
              fullWidth
              value={user.email}
              onChange={this.handleChange}
              required={true}
              required
              id='email'
              label='Email'
              name='email'
            />

            <div className='gender-country'>
              <div>
                <h4>Country</h4>
                <Select
                  autoWidth={false}
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={user.country}
                  name='country'
                  onChange={this.changeCountry}
                  style={{width: '100%'}}
                >
                  {countries.map((country, index) => {
                    return (
                      <MenuItem key={index} value={country}>
                        {country.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>
              <div>
                <h4>Gender</h4>
                <RadioGroup aria-label='gender' name='gender' value={user.gender} onChange={this.handleChange} style={{flexDirection: 'row'}}>
                  <FormControlLabel value='female' control={<Radio />} label='Female' />
                  <FormControlLabel value='male' control={<Radio />} label='Male' />
                </RadioGroup>
              </div>
            </div>

            <div style={{width: '100%'}}>
              {this.state.error && (
                <Alert
                  severity='warning'
                  action={
                    <Button color='inherit' size='small' onClick={this.closeErrorMessage}>
                      <CloseIcon />
                    </Button>
                  }
                >
                  Please fill in all required field marked with *
                </Alert>
              )}
            </div>

            <Button type='submit' size='large' variant='contained' color='primary' onClick={this.handleSubmit}>
              Register
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    countries: state.countries.countries,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (data) => dispatch(RegisterActions.register(data)),
    getCountries: () => dispatch(RegisterActions.getCountries()),
  };
};

const RegisterPage = connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);

export default RegisterPage;
