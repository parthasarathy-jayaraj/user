import config from 'config';
import authHeader from './auth-header';

/**
 * post the user to the register api.
 * @param {string} username
 * @param {string} params
 * @return {object} user
 * login the user to dashbaord
 * store user data in localStorage
 */

function login(username, password) {
  let login = {
    username: username,
    password: password,
  };
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(login),
  };

  let url = `${config.apiUrl}/authenticate`;

  return fetch(url, requestOptions)
    .then(handleResponse)
    .then((user) => {
      if (user.token) {
        localStorage.setItem('user', JSON.stringify(user));
      }

      return user;
    });
}

function logout() {
  localStorage.removeItem('user');
}

/**
 * post the user to the register api.
 * @param {object} user
 * @return {Promise} Registered
 */
function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user),
  };

  return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
}

/**
 * post the user to the register api.
 * @param {function} response
 * @return {object} data
 */
function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

/**
 * fetches all the users from the server.
 * @return {Promise} getAllUsers
 */
function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${config.apiUrl}/api/users`, requestOptions).then(handleResponse);
}

/**
 * fetches the user by id.
 * @param {string} username
 * @return {Promise} getAllUsers
 */
function getUserById(username) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${config.apiUrl}/api/users/${username}`, requestOptions).then(handleResponse);
}

export const userService = {
  login,
  logout,
  register,
  getAll,
  getUserById,
};
