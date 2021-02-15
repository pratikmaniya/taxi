import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import reducer from '../store/reducer';

const rootReducer = combineReducers({
    reducer: reducer
});

const configStore = (initialState) => {
    return createStore(rootReducer, {}, applyMiddleware(thunk), initialState);
}

export default configStore();