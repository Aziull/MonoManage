import { combineReducers } from '@reduxjs/toolkit';
import * as reducers from '../features';
import { baseApi } from '../features/api';

const appReducer = combineReducers({
  auth: reducers.authReducer,
  authToken: reducers.authTokenReducer,
  transaction: reducers.TransactionReducer,
  filters: reducers.FiltersReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_APP') {
    state = undefined;
  }
  return appReducer(state, action);
};

export const resetAppAction = () => (dispatch) => {
  console.log('Reset Redux Store');
  dispatch({ type: 'RESET_APP' });
};

export default rootReducer;