import {LOCALURL} from 'react-native-dotenv';

console.log(LOCALURL);
const apiService = store => next => action => {
  // console.log(action);
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

  fetch(`${LOCALURL}/${api.url}`, {method, body, headers})
    .then(res => res.json())
    .then(data => {
      if (data.status === 'Bad') {
        console.log(data);
        type = 'user/error';
        store.dispatch({type: type, data});
        return;
      }
      console.log(data);
      store.dispatch({type: type, data});
    })
    .catch(error => {
      type = 'user/error';
      store.dispatch({type: type, error});
    });
  // return next({type: type});
};

export default apiService;
