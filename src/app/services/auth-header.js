/**
 * returns the api header with authorization token attached.
 * @return {object} authorization
 */
const authHeader = () => {
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return {authorization: user.token};
  } else {
    return {};
  }
};

export default authHeader;
