const RegistrationReducer = (state = {}, action) => {
  switch (action.type) {
    case 'REGISTER_SUCCESS':
      return {registering: false};
    case 'REGISTER_FAILURE':
      return {registering: false};
    default:
      return state;
  }
};

export default RegistrationReducer;
