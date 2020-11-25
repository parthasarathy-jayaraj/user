import {userService} from '../../services/user.service';
import {history} from '../../services/history';
import {countryService} from '../../services/country.service';
const RegisterActions = {
  /**
   * post the user to the register api.
   * It is an action creator.
   * @return {function} return dispatch function
   * @param {object} user
   */
  register: (user) => {
    return (dispatch) => {
      userService.register(user).then(
        (user) => {
          dispatch({type: 'REGISTER_SUCCESS', user});
          dispatch({type: 'NOTIFY_SUCCESS', message: user});
          history.push('/login');
        },
        (error) => {
          dispatch({type: 'REGISTER_FAILURE', error});
          dispatch({type: 'NOTIFY_ERROR', message: error});
        }
      );
    };
  },

  /**
   * It is an action creator.
   * post the user to the register api.
   * @return {function} return dispatch function
   */
  getCountries: () => {
    return (dispatch) => {
      countryService.getCountries().then(
        (countries) => {
          dispatch({type: 'ALL_COUNTRIES', countries});
        },
        (error) => {
          dispatch({type: 'COUNTRIES_ERROR', error});
        }
      );
    };
  },
};

export default RegisterActions;
