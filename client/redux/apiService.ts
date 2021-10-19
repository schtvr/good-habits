import Config from 'react-native-config';

const apiService = store => next => action => {
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

  fetch(`${Config.LOCALURL}/${api.url}`, {method, body, headers})
    .then(res => res.json())
    .then(data => {
      if (data.status === 'Bad') {
        type = 'user/error';
        store.dispatch({type: type, data});
        return;
      }
      if (data.data && data.data.gainedExp) {
        dispatchUpdates(store, data.data);
      }
      store.dispatch({type: type, data});
    })
    .catch(error => {
      type = 'user/error';
      store.dispatch({type: type, error});
    });
};

const dispatchUpdates = async (store, update) => {
  if (update.achievements.length > 0) {
    store.dispatch({type: 'achievements/getNewAchievements', update});
  }
  store.dispatch({type: 'achievements/sortCompletedTask', update});
  store.dispatch({type: 'user/updateExp', update});
};

export default apiService;
