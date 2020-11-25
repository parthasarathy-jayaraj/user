const initialState = {
  countries: [],
};
const CountryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ALL_COUNTRIES':
      return {
        countries: action.countries,
      };
    case 'COUNTRIES_ERROR':
      return {
        type: 'error',
        message: action.error,
      };
    default:
      return state;
  }
};

export default CountryReducer;
