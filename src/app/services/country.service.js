import config from 'config';

/**
 * fetches all the countries from backend
 * @return {Promise} countries
 */
function getCountries() {
  const requestOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  };

  return fetch(`${config.apiUrl}/api/countries`, requestOptions).then(handleResponse);
}

/**
 * handles the reponse of getCountries api
 * @param {function} response
 */
function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}

export const countryService = {
  getCountries,
};
