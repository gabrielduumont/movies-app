import { createStore, applyMiddleware  } from 'redux';
import rootReducer from './combineReducers';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';

export default () => {
    const store = createStore(rootReducer, applyMiddleware(thunk));
    const persistor = persistStore(store);
    return { store, persistor };
}