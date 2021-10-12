import {LOCALURL} from 'react-native-dotenv';

const apiService = store => next => action => {
  console.log('inside apiService', action);
  if (!action?.payload?.api) return next(action);
  const api = action.payload.api;

  const method = api.method || 'GET';
  const body = api.body ? JSON.stringify(api.body) : undefined;
  const defaultHeaders = {'Content-Type': 'application/json'};
  const headers = {
    ...defaultHeaders,
    ...api.headers,
  };
  console.log('headers', headers);
  next({type: `${action.type}_REQUEST`});

  fetch(`${LOCALURL}/${api.url}`, {method, body, headers})
    .then(res => res.json())
    .then(data => {
      console.log('data', data);
      store.dispatch({type: action.type, data});
    })
    .catch(error => {
      store.dispatch({type: action.type, error});
    });
};

export default apiService;
