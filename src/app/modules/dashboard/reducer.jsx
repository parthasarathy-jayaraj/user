const initialState = {
  user: {},
  users: [],
};

const DashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GETALL_USER_SUCCESS':
      return {
        ...state,
        users: action.users,
      };
    case 'GET_USER_SUCCESS':
      return {
        ...state,
        user: action.user[0],
      };
    case 'GET_USER_FAIL':
      return {
        ...state,
        user: action.error,
      };
    case 'GETALL_USER_FAIL':
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default DashboardReducer;
