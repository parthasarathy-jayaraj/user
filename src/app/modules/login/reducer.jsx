let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? {loggedIn: true, user} : {};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        loggingIn: true,
        loggedIn: false,
        user: action.username,
      };
    case 'LOGIN_SUCCESS':
      return {
        loggingIn: false,
        loggedIn: true,
        user: action.user,
      };
    case 'LOGIN_FAILURE':
      return {
        loggingIn: false,
        loggedIn: false,
        error: action.error,
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};

export default LoginReducer;
