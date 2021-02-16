import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../store/reducer'

const rootReducer = combineReducers({
    reducer : reducer
});

export default function configStore(initialState) {
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'sandbox') {
        return createStore(rootReducer, {}, applyMiddleware(thunk), initialState);

    } else {
        return createStore(rootReducer, {}, applyMiddleware(thunk), initialState);
    }
}