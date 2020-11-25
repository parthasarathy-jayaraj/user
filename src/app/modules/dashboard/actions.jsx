import {userService} from '../../services/user.service';
import {history} from '../../services/history';

const dashboardActions = {
  /**
   * FETCHES all existing users
   * dispatches the action to reducer function
   */
  getAll: () => {
    return (dispatch) => {
      userService.getAll().then(
        (users) => {
          dispatch({type: 'GETALL_USER_SUCCESS', users});
          dispatch({type: 'NOTIFY_SUCCESS', message: users});
        },
        (error) => {
          dispatch({type: 'GETALL_USER_FAIL', error});
          dispatch({type: 'NOTIFY_ERROR', message: error});
          history.push('/login');
        }
      );
    };
  },

  getPersonalInformation: () => {
    return (dispatch) => {
      let {user} = JSON.parse(localStorage.getItem('user'));

      userService.getUserById(user.username).then(
        (user) => {
          dispatch({type: 'GET_USER_SUCCESS', user});
          dispatch({type: 'NOTIFY_SUCCESS', message: 'User Fetched'});
        },
        (error) => {
          dispatch({type: 'GET_USER_FAIL', error});
          dispatch({type: 'NOTIFY_ERROR', message: error});
          history.push('/login');
        }
      );
    };
  },
};

export default dashboardActions;
