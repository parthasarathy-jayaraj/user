const NotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case 'NOTIFY_SUCCESS':
      return {
        type: 'success',
        message: action.message,
      };
    case 'NOTIFY_ERROR':
      return {
        type: 'error',
        showToast: true,
        message: action.message,
      };
    case 'CLEAR':
      return {};
    default:
      return state;
  }
};

export default NotificationReducer;
