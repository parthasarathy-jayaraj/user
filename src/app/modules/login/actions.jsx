import {userService} from '../../services/user.service';
import {history} from '../../services/history';

/**
 * post the user to the register api.
 * It is an action creator.
 * @param {string} username
 * @param {string} password
 * @return {function} returns dispatch function
 */
const loginActions = {
  login: (username, password) => {
    return (dispatch) => {
      userService.login(username, password).then(
        (user) => {
          dispatch({type: 'LOGIN_SUCCESS', user});
          dispatch({type: 'NOTIFY_SUCCESS', message: user});
          history.push('/dashboard');
        },
        (error) => {
          dispatch({type: 'LOGIN_FAILURE', error});
          dispatch({type: 'NOTIFY_ERROR', message: error});
        }
      );
    };
  },
};

export default loginActions;
