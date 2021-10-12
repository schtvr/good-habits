

const apiService = store => next => action => {
  console.log('inside apiService', action)
  if (!action?.payload?.api) return next(action);
  const api = action.payload.api;
  
  const method = api.method || 'GET';
  const body = api.body ? JSON.stringify(api.body) : undefined;
  const defaultHeaders = { 'Content-Type': 'application/json' };
  const headers = {
    ...defaultHeaders,
    ...api.headers
  };

  const mock = {
    type: "user/signIn",
    payload: {
      user: {
      userName: 'tester',
      email: 'testerman',
      }
    }
  }
  
  console.log('passed api');
  fetch(api.url, {method, body, headers})
  .then(res => res.json())
  .then(data => {
    store.dispatch({ type: `${action.type}_SUCCESS`, data});
  })
  .catch(error => {
    console.log('in error');
    store.dispatch(mock);
  });  
  next({ type: `${action.type}_REQUEST` });
};

export default apiService;