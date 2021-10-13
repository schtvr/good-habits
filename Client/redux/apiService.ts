import {LOCALURL} from 'react-native-dotenv';

const apiService = store => next => action => {
  console.log('inside apiService', action.body);
  if (!action?.payload?.api) return next(action);
  const api = action.payload.api;
  let type = action.type;
  const method = api.method || 'GET';
  const body = api.body ? JSON.stringify(api.body) : undefined;
  const defaultHeaders = {'Content-Type': 'application/json'};
  const headers = {
    ...defaultHeaders,
    ...api.headers,
  };
  console.log(method, body, headers);
  fetch(`${LOCALURL}/${api.url}`, {method, body, headers})
  .then(res => res.json())
  .then(data => {
    if (data.status === 'Bad') {
      type = 'user/error'
      store.dispatch({type: type, data});
      return;
    }
    store.dispatch({type: type, data});
  })
  .catch(error => {
    type = 'user/error';
    store.dispatch({type: type, error});
  });
  // return next({type: type});
};

export default apiService;
