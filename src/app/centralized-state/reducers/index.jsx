import {combineReducers} from 'redux';

import LoginReducer from '../../modules/login/reducer';
import RegistrationReducer from '../../modules/register/reducer';
import DashboardReducer from '../../modules/dashboard/reducer';
import NotificationReducer from './notification/notification-reducer';
import CountryReducer from './countries/countries.reducer';

const rootReducer = combineReducers({
  login: LoginReducer,
  register: RegistrationReducer,
  users: DashboardReducer,
  countries: CountryReducer,
  notify: NotificationReducer,
});

export default rootReducer;
