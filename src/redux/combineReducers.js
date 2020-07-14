import { persistReducer } from 'redux-persist';
import storage from 'localforage';
import moviesReducer from './reducers/movies';

const persistConfig = {
    key: 'root',
    storage: storage,
};
const appReducer = persistReducer(persistConfig, moviesReducer);

export default function rootReducer(state,action){
    return appReducer(state,action);
}