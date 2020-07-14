import { createStore } from 'redux';
import rootReducer from './combineReducers';
import { persistStore } from 'redux-persist';

export default () => {
    const store = createStore(rootReducer);
    const persistor = persistStore(store);
    return { store, persistor };
}